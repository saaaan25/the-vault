"use client"

import type { Playlist } from "@/types"
import PlaylistItem from "./Playlist"
import AddPlaylistButton from "./AddPlaylistButton"

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
                href="playlist"
                />
            ))}
            <AddPlaylistButton/>
        </div>
    )
}
 
export default LibraryContent