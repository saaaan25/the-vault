"use client";

import { Queue } from "@/structures/queue";
import SongModel1 from "@/components/SongModel1";
import { Song } from "@/types";
import { useState } from "react";
import { useRecentSearch } from "@/hooks/useRecentSearch";
import useOnPlay from "@/hooks/useOnPlay";

const SongRecent = () => {
    const { queue } = useRecentSearch();
    const songs = queue.getItems().reverse();
    const onPlay = useOnPlay(songs);
    if (queue.size() === 0) {
        return (
            <div className="flex flex-col gap-y-2 w-full px-12 text-neutral-400 ml-2">
                <p className="">No hay busquedas recientes</p>
            </div>
        )
    }

    return (
        <div className="flex ml-14 gap-x-4 mt-4">
            {songs.map((item) => (
                <SongModel1
                    key={item.id}
                    onClick={(id: number) => onPlay(id)}
                    data={item}
                    playlists={[]}
                    small={true} // Add the "small" property
                />
            ))}
        </div>
    );
}

export default SongRecent;