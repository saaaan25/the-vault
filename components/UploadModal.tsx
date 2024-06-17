"use client"

import useUpload from "@/hooks/useUpload"
import Modal from "./Modal"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react"
import Input from "./Input"
import toast from "react-hot-toast"
import { useUser } from "@/hooks/useUser"
import uniqid from "uniqid"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"

const UploadModal = () => {
    const [isLoading, setIsLoading] = useState(false)
    const uploadModal = useUpload()
    const { user } = useUser()
    const supabaseClient = useSupabaseClient()
    const router = useRouter()

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            autor: '',
            title: '',
            song: null,
            image: null,
        }
    })

    const onChange = (open:boolean) => {
        if (!open) {
            reset()
            uploadModal.onClose()
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true)

            const imageFile = values.image?.[0]
            const songFile = values.song?.[0]

            if (!imageFile || !songFile || !user) {
                toast.error("Campos incompletos")
                return
            }

            const uniqueID = uniqid()

            const {
                data: songData,
                error: songError,
            } = await supabaseClient.storage.from('songs')
            .upload(`song-${values.title}-${uniqueID}`, songFile, {
                cacheControl: '3600',
                upsert: false
            })

            if (songError) {
                setIsLoading(false)
                return toast.error('No se pudo subir la canción')
            }

            const {
                data: imageData,
                error: imageError,
            } = await supabaseClient.storage.from('images')
            .upload(`image-${values.title}-${uniqueID}`, imageFile, {
                cacheControl: '3600',
                upsert: false
            })

            if (imageError) {
                setIsLoading(false)
                return toast.error('No se pudo subir la imagen')
            }

            const {
                error: supabaseError
            } = await supabaseClient.from('songs').insert({
                user_id: user.id,
                title: values.title,
                autor: values.autor,
                image_path: imageData.path,
                song_path: songData.path

            })

            if (supabaseError) {
                setIsLoading(false)
                return toast.error(supabaseError.message)
            }

            router.refresh()
            setIsLoading(false)
            toast.success('Canción creada')
            reset()

        } catch (error) {
            toast.error("Algo salió mal")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Modal
        title="Agrega una canción"
        description=""
        isOpen={uploadModal.isOpen}
        onChange={onChange}>
            <form onSubmit={handleSubmit(onSubmit)}
                className="flex 
                        justify-end 
                        flex-col 
                        gap-y-4 
                        ml-5 
                        mr-5">
                <div className="flex 
                            gap-x-3 
                            text-sm 
                            items-center">
                    <div className="w-[25%] flex justify-end">Canción</div>
                    <Input
                    id="title"
                    disabled={isLoading}
                    {...register('title', { required: true })}
                    placeholder="Nombre de la canción"
                    />
                </div>
                <div className="flex 
                            gap-x-3 
                            text-sm 
                            items-center">
                    <div className="w-[25%] flex justify-end">Artista</div>
                    <Input
                    id="autor"
                    disabled={isLoading}
                    {...register('autor', { required: true })}
                    placeholder="Nombre del artista"
                    />
                </div>
                <div className="flex 
                            flex-col 
                            text-sm 
                            items-center 
                            mt-2 
                            w-full">
                    <div className="pb-2 flex justify-start w-full">
                        Selecciona un archivo
                    </div>
                    <Input
                    className="border border-black rounded-md"
                    id="song"
                    type="file"
                    disabled={isLoading}
                    accept=".mp3"
                    {...register('song', { required: true })}
                    />
                </div>
                <div className="flex 
                            flex-col 
                            text-sm 
                            items-center 
                            mt-2 
                            w-full">
                    <div className="pb-2 flex justify-start w-full">
                        Selecciona una imagen
                    </div>
                    <Input
                    className="border border-black rounded-md"
                    id="image"
                    type="file"
                    disabled={isLoading}
                    accept="image/*"
                    {...register('image', { required: true })}
                    />
                </div>
                <div className="
                        w-full 
                        h-full 
                        mt-4
                        mb-2 
                        flex 
                        items-center 
                        justify-center">
                    <button disabled={isLoading} type="submit"
                            className="bg-custom-color rounded-md h-[30px] w-fit px-5">
                        Subir canción
                    </button>
                </div>
                
            </form>
        </Modal>
    )
}
 
export default UploadModal