"use client"

import type { Playlist, Song } from "@/types"
import PlaylistItem from "./Playlist"
import AddPlaylistButton from "./AddPlaylistButton"
import SongModel2 from "./SongModel2"

interface LibraryContentProps {
    playlists: Playlist[]
}

const LibraryContent: React.FC<LibraryContentProps> = ({ playlists }) => {
    if (playlists.length === 0) {
        return (
            <div>
                No hay playlist
            </div>
        )
    }

    return (
        <div className="mr-2 flex">
            {playlists.map((item) => (
                <PlaylistItem 
                key={item.id}
                onClick={() => {}}
                data={item}
                />
            ))}
            <AddPlaylistButton/>
        </div>
    )
}
 
export default LibraryContent