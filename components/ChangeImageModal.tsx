"use client"

import useUpload from "@/hooks/useUpload"
import Modal from "./Modal"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react"
import Input from "./Input"
import toast from "react-hot-toast"
import { useUser } from "@/hooks/useUser"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"

interface ChangeImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdateImageUrl: (url: string) => void;
}

const ChangeImageModal: React.FC<ChangeImageModalProps> = ({ isOpen, onClose, onUpdateImageUrl }) => {
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useUser()
    const supabaseClient = useSupabaseClient()
    const router = useRouter()

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            image: null,
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true)

            const imageFile = values.image?.[0]

            if (!imageFile || !user) {
                toast.error("Imagen no seleccionada")
                return
            }

            const userId = user.id
            const imageName = `userImage-${userId}`

            const { data: imageData, error: imageError } = await supabaseClient.storage
                .from('images')
                .upload(imageName, imageFile, {
                    cacheControl: '3600',
                    upsert: true
                })

            if (imageError) {
                setIsLoading(false)
                return toast.error('No se pudo subir la imagen')
            }

            const imagePath = imageData.path
            const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${imagePath}?${new Date().getTime()}`;

            // Actualizar la URL de la imagen en la base de datos de usuarios
            const { error: userError } = await supabaseClient.from('users')
                .update({ avatar_url: imageUrl })
                .eq('id', user.id)

            if (userError) {
                setIsLoading(false)
                return toast.error('No se pudo actualizar el avatar')
            }

            router.refresh()
            setIsLoading(false)
            toast.success('Imagen subida con éxito')
            onUpdateImageUrl(imageUrl);
            reset()
            onClose()

        } catch (error) {
            console.error("Algo salió mal al subir la imagen:", error)
            toast.error("Algo salió mal")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Modal
            title="Cambia tu imagen"
            description=""
            isOpen={isOpen}
            onChange={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}
                className="flex 
                        justify-end 
                        flex-col 
                        gap-y-4 
                        ml-5 
                        mr-5">
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
                        Subir imagen
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default ChangeImageModal
