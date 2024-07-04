"use client"

import type { Playlist } from "@/types"
import PlaylistItem from "../../../components/Playlist"
import AddPlaylistButton from "../../../components/AddPlaylistButton"
import LoadingPage from "@/components/LoadingPage"

interface LibraryContentProps {
    playlists: Playlist[]
}

const LibraryContent: React.FC<LibraryContentProps> = ({ playlists }) => {
    if (playlists.length === 0) {
        return (
            <div className="mt-4 h-full w-full text-black flex items-center justify-center">
                <LoadingPage/>
            </div>
        )
    }

    return (
        <div className="mr-2
                        grid
                        grid-cols-2
                        sm:grid-cols-3
                        md:grid-cols-3
                        lg:grid-cols-4
                        xl:grid-cols-5
                        2xl:grid-cols-8
                        gap-2">
            {playlists.map((item) => (
                <PlaylistItem 
                key={item.id}
                data={item}
                />
            ))}
            <AddPlaylistButton/>
        </div>
    )
}
 
export default LibraryContent