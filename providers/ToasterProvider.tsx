"use client"

import { Toaster } from "react-hot-toast"

const ToasterProvider = () => {
    return (
        <Toaster
            toastOptions={{
                style: {
                    background: "#F3E6DE",
                    color: "#000000"
                },
                iconTheme: {
                    primary: "#000000", 
                    secondary: "#F3E6DE",
                }
            }}
        />
    )
}

export default ToasterProvider