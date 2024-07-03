"use client";

import { Queue } from "@/Structures/queue";
import SongModel1 from "@/components/SongModel1";
import { Song } from "@/types";
import { useState } from "react";

const SongRecent = () => {
    const [queue, setQueue] = useState(new Queue<Song>())
    if (queue.size() === 0) {
        return (
            <div className="flex justify-center items-center h-full w-full">
                <p className="text-2xl">No hay busquedas recientes</p>
            </div>
        )
    }
    const songs = queue.getItems()
    return ( 
    <div> 
        {songs.map((item) => (
                <SongModel1 
                key={item.id}
                onClick={() => {}}
                data={item}
                playlists={[]}
                />
            ))}
    </div> );
    //aqui hacer la logica de colas
}
 
export default SongRecent;