import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"
import Sidebar from "@/components/Sidebar"
import SupabaseProvider from "@/providers/SupabaseProvider"
import UserProvider from "@/providers/UserProvider"
import ModalProvider from "@/providers/ModalProvider"
import ToasterProvider from "@/providers/ToasterProvider"
import { PlaylistProvider } from "@/providers/PlaylistProvider"
import Player from "@/components/Player"
import { QueueProvider } from "@/hooks/useQueue"
import { RecentSearchProvider } from "@/hooks/useRecentSearch"

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
                            <QueueProvider>
                                <RecentSearchProvider>
                                    <Sidebar>{children}</Sidebar>
                                    <Player/>
                                </RecentSearchProvider>
                            </QueueProvider>
                        </PlaylistProvider>
                        <ModalProvider/>
                    </UserProvider>
                </SupabaseProvider>
            </body>
        </html>
    )
}
