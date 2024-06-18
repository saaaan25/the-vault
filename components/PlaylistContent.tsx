"use client"

import type { Song } from "@/types"
import PlaylistItem from "./Playlist"
import AddPlaylistButton from "./AddPlaylistButton"
import SongModel2 from "./SongModel2"

interface PlaylistContentProps {
    songs: Song[]
}

const PlaylistContent: React.FC<PlaylistContentProps> = ({ songs }) => {
    if (songs.length === 0) {
        return (
            <div>
                No hay playlist
            </div>
        )
    }

    return (
        <div className="mr-2 flex flex-col">
            {songs.map((item) => (
                <SongModel2 
                key={item.id}
                onClick={() => {}}
                data={item}
                />
            ))}
        </div>
    )
}
 
export default PlaylistContent