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
                title="Ola rey de mi corazón" 
                description="Te amo precioso" 
                isOpen 
                onChange={() => {}}>
                    Bonito / children
            </Modal>
        </>
    )
}
 
export default ModalProvider