"use client"

import type { Playlist, Song } from "@/types"
import SongModel2 from "./SongModel2"

interface PlaylistContentProps {
    songs: Song[]
    playlists: Playlist[]
}

const PlaylistContent: React.FC<PlaylistContentProps> = ({ songs, playlists = [] }) => {
    if (songs.length === 0) {
        return (
            <div>
                No hay playlist
            </div>
        )
    }

    return (
        <div className="mr-2 flex flex-col w-full">
            {songs.map((item) => (
                <SongModel2 
                key={item.id}
                onClick={() => {}}
                data={item}
                playlists={playlists}
                />
            ))}
        </div>
    )
}
 
export default PlaylistContent