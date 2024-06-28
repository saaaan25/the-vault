"use client"

import useAuth from "@/hooks/useAuth"
import { useUser } from "@/hooks/useUser"
import { Playlist, Song } from "@/types"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { BiSolidPlaylist } from "react-icons/bi"

interface PlaylistChoiceProps {
    playlists: Playlist[]
    song1: Song
}

const PlaylistChoice: React.FC<PlaylistChoiceProps> = ({playlists = [], song1}) => {
    const { user } = useUser()
    const authModal = useAuth()
    const [exist, setExist] = useState<Record<number, boolean>>({})
    const [loading, setLoading] = useState<Record<number, boolean>>({})
    const router = useRouter()
    const { supabaseClient } = useSessionContext()

    useEffect(() => {
        if (!user?.id || playlists.length === 0) {
            return
        }

        const fetchExistence = async (playlistId: number) => {
            const { data: playlistData, error } = await supabaseClient.from('playlists').select('*')
                .eq('user_id', user.id).eq('id', playlistId).single()

            if (!error && playlistData) {
                const songs = playlistData.songs || [] // Asegurar que songs es un arreglo
                const newExist = { ...exist, [playlistId]: songs.includes(song1.title) }
                setExist(newExist)
            }
        }

        playlists.forEach(playlist => fetchExistence(playlist.id))
    }, [playlists, supabaseClient, user?.id, song1.title, exist])

    const addToAPlaylist = async (playlistId: number, actualSong: string) => {
        const selectedPlaylist = playlists.find(playlist => playlist.id === playlistId)
        if (!selectedPlaylist) return

        if (!user) {
            return authModal.onOpen()
        }

        const existsInPlaylist = exist[playlistId]

        if (existsInPlaylist) {
            const updatedSongs = selectedPlaylist.songs.filter(song => song !== actualSong)
            const { error } = await supabaseClient.from('playlists')
                .update({ songs: updatedSongs })
                .eq('id', playlistId)

            if (error) {
                toast.error(error.message)
            } else {
                const newExist = { ...exist, [playlistId]: false }
                setExist(newExist)
                toast.success(`Eliminada de ${selectedPlaylist.name}`)
            }
        } else {
            const updatedSongs = [...(selectedPlaylist.songs || []), actualSong]
            const { error } = await supabaseClient.from('playlists')
                .update({ songs: updatedSongs })
                .eq('id', playlistId)

            if (error) {
                toast.error(error.message)
            } else {
                const newExist = { ...exist, [playlistId]: true }
                setExist(newExist)
                toast.success(`Agregada a ${selectedPlaylist.name}`)
            }
        }
        router.refresh()
    }

    if (playlists.length === 0) {
        return (
            <div className="flex items-center w-full px-2 py-2 mr-2 hover:bg-custom-color-6 rounded-md">
                No hay playlist
            </div>
        )
    }

    return (
        <div>
            {playlists.map((item) => (
                <button key={item.id} className="flex items-center w-full px-2 py-2 mr-2 hover:bg-custom-color-6 rounded-md"
                        onClick={() => addToAPlaylist(item.id, song1.title)}
                        disabled={loading[item.id]}>  
                    <BiSolidPlaylist size={20} className="mr-2"/>
                    <p>{item.name}{exist[item.id] ? ' - eliminar' : ''}</p>
                </button>
            ))}
        </div>
    )
}

export default PlaylistChoice
