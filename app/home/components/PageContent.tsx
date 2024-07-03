"use client";

import SongModel1 from "@/components/SongModel1";
import useOnPlay from "@/hooks/useOnPlay";
import { Playlist, Song } from "@/types";

interface PageContentProps {
    songs: Song[]
    playlists: Playlist[]
}

const PageContent: React.FC<PageContentProps> = ({
    songs,
    playlists
}) => {
    const onPlay = useOnPlay(songs)

    if (songs.length === 0) {
        return (
            <div className="mt-4 text-black">
                No has agregado ninguna canción...
            </div>
        )
    }
    return (
        <div
            className="
                grid
                grid-cols-2
                sm:grid-cols-3
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-8
                gap-4
                mt-4"
        >
            {songs.map((item) => (
                <SongModel1
                    key={item.id}
                    onClick={(id: number) => onPlay(id)}
                    data={item}
                    playlists={playlists}
                    small={false}
                />
            ))}
        </div>
    );
}

export default PageContent;