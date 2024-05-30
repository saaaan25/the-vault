"use client"

import Modal from "@/components/Modal"
import { useEffect, useState } from "react"

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
            <Modal 
                title="Título" 
                description="Descripción" 
                isOpen 
                onChange={() => {}}>
                    children
            </Modal>
        </>
    )
}
 
export default ModalProvider