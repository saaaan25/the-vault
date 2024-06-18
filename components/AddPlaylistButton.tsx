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
                h-[200px] 
                w-[180px] 
                rounded-lg
                bg-custom-color-2
                flex
                justify-center
                ml-5
                ">
            <button className="
                bg-custom-color-3
                hover:bg-custom-color-6
                rounded-xl
                shadow-lg 
                h-[150px] 
                w-[150px]
                mt-3
                flex
                items-center
                justify-center"
                onClick={onClick}>
                <p className="font-thin text-9xl text-custom-color-2 shadow-inner">+</p>
            </button>
        </div>
    )
}
 
export default AddPlaylistButton