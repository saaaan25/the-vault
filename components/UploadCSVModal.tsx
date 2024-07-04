"use client";

import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { parse } from "papaparse";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Modal from "./Modal";
import Input from "./Input";
import useCSVUpload from "@/hooks/useCSVModal";
import { useUser } from "@/hooks/useUser";

const UploadCSVModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const csvUploadModal = useCSVUpload();
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const { register, handleSubmit, reset } = useForm<FieldValues>({
        defaultValues: {
            csv: null,
        }
    });

    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            csvUploadModal.onClose();
        }
    };

    const handleCSVUpload = async (file: File) => {
        return new Promise((resolve, reject) => {
            parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    resolve(results.data);
                },
                error: (error) => {
                    reject(error);
                },
            });
        });
    };

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);

            const csvFile = values.csv?.[0];

            if (!csvFile || !user) {
                toast.error("Por favor sube un archivo CSV");
                return;
            }

            const songsData = await handleCSVUpload(csvFile) as any[];

            for (const song of songsData) {
                const { autor, title, songPath, imagePath } = song;

                try {
                    const songBlob = await fetch(songPath).then(res => {
                        if (!res.ok) throw new Error('Error fetching song');
                        return res.blob();
                    });
                    const imageBlob = await fetch(imagePath).then(res => {
                        if (!res.ok) throw new Error('Error fetching image');
                        return res.blob();
                    });

                    const songFile = new File([songBlob], `song-${title}`);
                    const imageFile = new File([imageBlob], `image-${title}`);

                    const uniqueID = uniqid();

                    const { data: songData, error: songError } = await supabaseClient.storage.from('songs')
                        .upload(`song-${title}-${uniqueID}`, songFile, {
                            cacheControl: '3600',
                            upsert: false
                        });

                    if (songError) {
                        throw new Error(`Song upload error: ${songError.message}`);
                    }

                    const { data: imageData, error: imageError } = await supabaseClient.storage.from('images')
                        .upload(`image-${title}-${uniqueID}`, imageFile, {
                            cacheControl: '3600',
                            upsert: false
                        });

                    if (imageError) {
                        throw new Error(`Image upload error: ${imageError.message}`);
                    }

                    const { error: supabaseError } = await supabaseClient.from('songs').insert({
                        user_id: user.id,
                        title: title,
                        autor: autor,
                        image_path: imageData.path,
                        song_path: songData.path
                    });

                    if (supabaseError) {
                        throw new Error(`Database insert error: ${supabaseError.message}`);
                    }
                } catch (error) {
                    toast.error(`Error processing song "${title}": `);
                }
            }

            router.refresh();
            setIsLoading(false);
            toast.success('Canciones creadas');
            reset();

        } catch (error) {
            toast.error(`Error general: `);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            title="Sube múltiples canciones"
            description="Selecciona un archivo CSV para subir múltiples canciones"
            isOpen={csvUploadModal.isOpen}
            onChange={onChange}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex justify-end flex-col gap-y-4 ml-5 mr-5">
                <div className="flex gap-x-3 text-sm items-center">
                    <div className="w-[25%] flex justify-end">Archivo CSV</div>
                    <Input
                        id="csv"
                        type="file"
                        disabled={isLoading}
                        accept=".csv"
                        {...register('csv', { required: true })}
                        className="border border-black rounded-md"
                    />
                </div>
                <div className="w-full h-full mt-4 mb-2 flex items-center justify-center">
                    <button disabled={isLoading} type="submit" className="bg-custom-color rounded-md h-[30px] w-fit px-5">
                        Subir canciones
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default UploadCSVModal;
