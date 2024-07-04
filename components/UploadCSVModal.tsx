"use client";

import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { parse } from "papaparse";
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

    const checkFileExistence = async (bucket: string, path: string) => {
        const { data, error } = await supabaseClient.storage.from(bucket).list('', {
            search: path
        });
        return data && data.length > 0 && !error;
    };

    const getPublicUrl = (bucket: string, path: string) => {
        const { data } = supabaseClient.storage.from(bucket).getPublicUrl(path);
        return data.publicUrl;
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
                const { autor, title, songData, imageData } = song;

                const songExists = await checkFileExistence('songs', songData);
                const imageExists = await checkFileExistence('images', imageData);

                if (!songExists || !imageExists) {
                    toast.error(`Archivos no encontrados para la canción "${title}": songData=${songData}, imageData=${imageData}`);
                    continue;
                }

                const songUrl = getPublicUrl('songs', songData);
                const imageUrl = getPublicUrl('images', imageData);
                console.log(songUrl, imageUrl)

                const { error: supabaseError } = await supabaseClient.from('songs').insert({
                    user_id: user.id,
                    title: title,
                    autor: autor,
                    image_path: imageData,
                    song_path: songData
                });

                if (supabaseError) {
                    setIsLoading(false);
                    return toast.error(supabaseError.message);
                }
            }

            router.refresh();
            setIsLoading(false);
            toast.success('Canciones creadas');
            reset();

        } catch (error) {
            toast.error("Algo salió mal");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            title="Sube múltiples canciones"
            description="Selecciona un archivo CSV para subir canciones"
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
