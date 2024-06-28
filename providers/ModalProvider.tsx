"use client"

import LoginModal from "@/components/LoginModal"
import UploadModal from "@/components/UploadModal"
import UploadPlaylistModal from "@/components/UploadPlaylistModal"
import { Children, useEffect, useState } from "react"

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    return (
        <>
            <LoginModal/>
            <UploadModal/>
            <UploadPlaylistModal/>
        </>
    )
}
 
export default ModalProvider