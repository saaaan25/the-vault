"use client"

import Modal from "./Modal"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react"
import Input from "./Input"
import toast from "react-hot-toast"
import { useUser } from "@/hooks/useUser"
import uniqid from "uniqid"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import useUploadP from "@/hooks/useUploadP"

const UploadPlaylistModal = () => {
    const [isLoading, setIsLoading] = useState(false)
    const uploadPlaylistModal = useUploadP()
    const { user } = useUser()
    const supabaseClient = useSupabaseClient()
    const router = useRouter()

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            image: null,
        }
    })

    const onChange = (open:boolean) => {
        if (!open) {
            reset()
            uploadPlaylistModal.onClose()
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true)

            const imageFile = values.image?.[0]

            if (!imageFile || !user) {
                toast.error("Campos incompletos")
                return
            }

            const uniqueID = uniqid()

            const {
                data: imageData,
                error: imageError,
            } = await supabaseClient.storage.from('images')
            .upload(`image-${values.name}-${uniqueID}`, imageFile, {
                cacheControl: '3600',
                upsert: false
            })

            if (imageError) {
                setIsLoading(false)
                return toast.error('No se pudo subir la imagen')
            }

            const {
                error: supabaseError
            } = await supabaseClient.from('playlists').insert({
                user_id: user.id,
                name: values.name,
                image_path: imageData.path

            })

            if (supabaseError) {
                setIsLoading(false)
                return toast.error(supabaseError.message)
            }

            router.refresh()
            setIsLoading(false)
            toast.success('Playlist creada')
            reset()

        } catch (error) {
            toast.error("Algo salió mal")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Modal
        title="Crea una playlist"
        description=""
        isOpen={uploadPlaylistModal.isOpen}
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
                    <div className="w-[25%] flex justify-end">Nombre</div>
                    <Input
                    id="name"
                    disabled={isLoading}
                    {...register('name', { required: true })}
                    placeholder="Nombre de la playlist"
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
                        Crear playlist
                    </button>
                </div>
                
            </form>
        </Modal>
    )
}
 
export default UploadPlaylistModal