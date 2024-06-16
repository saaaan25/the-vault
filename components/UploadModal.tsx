"use client"

import useUpload from "@/hooks/useUpload"
import Modal from "./Modal"
import { FieldValues, useForm } from "react-hook-form"

const UploadModal = () => {
    const uploadModal = useUpload()

    const onChange = (open:boolean) => {
        if (!open) {
            uploadModal.onClose()
        }
    }

    const {} = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null,
        }
    })

    return (
        <Modal
        title="Agrega una canción"
        description="Sube un archivo .mp3"
        isOpen={uploadModal.isOpen}
        onChange={onChange}>
            Form
        </Modal>
    )
}
 
export default UploadModal