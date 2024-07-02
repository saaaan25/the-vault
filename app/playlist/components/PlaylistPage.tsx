"use client"

import Header from "@/components/Header"
import PlaylistContent from "@/app/playlist/components/PlaylistContent"
import { Playlist } from "@/types"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useEffect, useState } from "react"
import useLoadImageP from "@/hooks/useLoadImageP"
import Image from 'next/image'

interface PlaylistPageProps {
    id: number
}

const PlaylistPage: React.FC<PlaylistPageProps> = ({id}) => {
    const [playlists, setPlaylists] = useState<Playlist[]>([])
    const [playlist, setPlaylist] = useState<Playlist | null>(null)
    const supabaseClient = useSupabaseClient()
    
    const imagePath = useLoadImageP(playlist)

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await fetch('/api/playlist')
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json()
                setPlaylists(data);
            } catch (error) {
                console.error('Failed to fetch playlist:', error);
            }
        }

        fetchPlaylists()
        
    },[])

    useEffect(() => {
        if (!id) { return }
        const fetchPlaylist = async () => {
            try {
                const { data: playlist, error } = await supabaseClient
                    .from('playlists')
                    .select('*')
                    .eq('id', id)
                    .single();
                
                if (error) {
                    throw error;
                }

                if (playlist) {
                    setPlaylist(playlist);
                }
            } catch (error) {
                console.error('Failed to fetch playlist by ID:', error);
            }
        }

        if (id) {
            fetchPlaylist();
        }
    },[id, supabaseClient])

    return (
        <div className=" 
            bg-custom-color-2 
            text-black 
            h-full 
            w-full 
            overflow-hidden 
            overflow-y-auto
            flex
            flex-col
            ">
            <Header>
                <></>
            </Header>
            <div className="mb-2 ml-14 mr-14 mt-2">
                <div className="
                    flex 
                    justify-start 
                    items-center
                    relative
                    gap-x-9
                    mb-10
                    ">
                    <div className="h-[200px] w-[full] relative aspect-square">
                        <Image
                            className="object-cover"
                            src={imagePath || '/images/portadapredet.png'}
                            fill
                            alt="Image"
                            style={{ borderRadius: '5px' }}
                        />
                    </div>
                    <div>
                        <h1 className="
                            text-black
                            text-2xl
                            font-bold
                            ">
                            {playlist?.name}
                        </h1>
                    </div>
                    
                </div>
                <div className="flex mt-6">
                    <PlaylistContent songsName={playlist?.songs} playlists={playlists}/>
                </div>
            </div>
        </div>
    )
}

export default PlaylistPage