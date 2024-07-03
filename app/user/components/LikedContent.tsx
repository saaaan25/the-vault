"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useOnPlay from "@/hooks/useOnPlay";
import { Playlist, Song } from "@/types";
import { useUser } from "@/hooks/useUser";
import SongModel1 from "@/components/SongModel1";

interface LikedContentProps {
    songs: Song[];
    playlists: Playlist[]
}
const LikedContent: React.FC<LikedContentProps> = ({ songs, playlists }) => {
    const onPlay = useOnPlay(songs)
    const router = useRouter();
    const {isLoading, user} = useUser();

    useEffect (() => {
        if(!isLoading && !user) {
            router.replace("/home");
        }
    }, [isLoading, user, router]);

    if(songs.length === 0) {
        return(
            <div className="text-center text-xl font-bold">
                No tienes canciones favoritas
            </div>
        )
    }
  return (
    <div className="flex gap-2 h-46 overflow-x-auto pr-1 pb-1 ">
        {songs.map((song) => ( 
            <div key={song.id} className="">
                <SongModel1
                    key={song.id}
                    onClick={(id: number) => onPlay(id)}
                    data={song}
                    playlists={playlists}
                    small={true}
                />
            </div>
        ))}
    </div>
  )
}

export default LikedContent