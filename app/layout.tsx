import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"
import Sidebar from "@/components/Sidebar"
import SupabaseProvider from "@/providers/SupabaseProvider"
import UserProvider from "@/providers/UserProvider"
import ModalProvider from "@/providers/ModalProvider"
import ToasterProvider from "@/providers/ToasterProvider"
import { useUser } from "@/hooks/useUser"
import { PlaylistProvider } from "@/providers/PlaylistProvider"

const font = Montserrat({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "The Vault_",
  description: "Biblioteca de música",
}

export const revalidate = 0

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
                        <PlaylistProvider>
                            <Sidebar>{children}</Sidebar>
                        </PlaylistProvider>
                        <ModalProvider/>
                    </UserProvider>
                </SupabaseProvider>
            </body>
        </html>
    )
}
