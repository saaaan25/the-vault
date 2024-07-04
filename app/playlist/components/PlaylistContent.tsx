"use client"

import type { Playlist, Song } from "@/types"
import SongModel2 from "../../../components/SongModel2"
import useOnPlay from "@/hooks/useOnPlay"
import { useEffect, useState } from "react"
import { useUser } from "@/hooks/useUser"
import LoadingPage from "@/components/LoadingPage"

interface PlaylistContentProps {
    songsName: string[] | undefined
    playlists: Playlist[]
}

const PlaylistContent: React.FC<PlaylistContentProps> = ({ songsName, playlists = [] }) => {
    const [songs, setSongs] = useState<Song[]>([])

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await fetch('/api/songs')
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json()
                setSongs(data);
            } catch (error) {
                console.error('Failed to fetch songs:', error);
            }
        }

        fetchSongs()
    },[])  

    const songsInPlaylist = songs.filter((song) => songsName?.includes(song.title))

    const onPlay = useOnPlay(songsInPlaylist)

    if (songsInPlaylist.length === 0) {
        return (
            <div className="mt-4 h-full w-full text-black flex items-center justify-center">
                <LoadingPage/>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full w-full">
            <div className="
                        flex
                        text-sm 
                        pl-6 pr-6 
                        h-[30px] 
                        border-b 
                        border-black 
                        justify-between">
                <p>
                    Título
                </p>
                <p>
                    the-vault
                </p>
            </div>
            <br></br>
            <div className="mr-2 flex-col w-full">
                {songsInPlaylist.map((item) => (
                    <SongModel2 
                    key={item.id}
                    onClick={(id: number) => onPlay(id)}
                    data={item}
                    playlists={playlists}
                    />
                ))}
            </div>
        </div>
    )
}
 
export default PlaylistContent