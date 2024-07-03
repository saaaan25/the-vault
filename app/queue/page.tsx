"use client"
import Header from "@/components/Header";
import { Queue } from "@/structures/queue";
import { Song, Playlist } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import QueueContent from "./components/QueueContent";
import { useQueue } from "@/hooks/useQueue";

const QueuePage = () => {
    const router = useRouter()
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const { queue, removeFromQueue, clearQueue } = useQueue()

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await fetch('/api/playlist');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPlaylists(data);
            } catch (error) {
                console.error('Failed to fetch playlist:', error);
            }
        }

        fetchPlaylists();
        
    }, []);

    return (
        <div className=" 
            bg-custom-color-2 
            text-black 
            h-full 
            w-full 
            overflow-hidden 
            overflow-y-auto
            ">
            <Header>
                <></>
            </Header>
            <div className="mb-2 ml-14 mr-14">
                <div className="
                    flex 
                    justify-between 
                    items-center
                    ">
                    <h1 className="
                        text-black
                        text-2xl
                        font-bold
                        ">
                        Fila de reproducción
                    </h1>
                </div>
                <div className="flex mt-6">
                    <QueueContent list={queue.getItems()} playlists={playlists} />
                </div>
            </div>
        </div>
    );
};

export default QueuePage;
