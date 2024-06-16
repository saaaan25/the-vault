import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"
import Sidebar from "@/components/Sidebar"
import SupabaseProvider from "@/providers/SupabaseProvider"
import UserProvider from "@/providers/UserProvider"
import ModalProvider from "@/providers/ModalProvider"
import ToasterProvider from "@/providers/ToasterProvider"

const font = Montserrat({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "The Vault_",
  description: "Biblioteca de música",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    
    return (
        <html lang="es">
            <body className={font.className}>
                <ToasterProvider/>
                <SupabaseProvider>
                    <UserProvider>
                        <ModalProvider/>
                        <Sidebar>{children}</Sidebar>
                    </UserProvider>
                </SupabaseProvider>
            </body>
        </html>
    )
}
