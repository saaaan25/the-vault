"use client"

import useAuth from "@/hooks/useAuth"
import useUploadP from "@/hooks/useUploadP"
import { useUser } from "@/hooks/useUser"

const AddPlaylistButton = () => {
    const authModal = useAuth()
    const { user } = useUser()
    const uploadPlaylistModal = useUploadP()

    const onClick = () => {
        if (!user) {
            return authModal.onOpen()
        }

        return uploadPlaylistModal.onOpen()
    }
    return (
        <div className="
                h-[210px] 
                w-[189px] 
                rounded-lg
                bg-custom-color-2
                flex
                justify-center
                ">
            <button className="
                bg-custom-color-3
                hover-bg-custom-color-6
                rounded-xl
                shadow-lg 
                h-[172px]
                w-[172px]
                mt-3
                flex
                items-center
                justify-center"
                onClick={onClick}>
                <p className="font-thin text-9xl text-custom-color-2">+</p>
            </button>
        </div>
    )
}
 
export default AddPlaylistButton