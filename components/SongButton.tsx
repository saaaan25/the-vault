"use client"

import useAuth from "@/hooks/useAuth"
import { useUser } from "@/hooks/useUser"
import { FaEllipsisV, FaList } from "react-icons/fa"
import PopoverTemplate from "./PopoverTemplate"
import { BsFillPlayCircleFill } from "react-icons/bs"
import { BiSolidPlaylist } from "react-icons/bi"
import PlaylistChoice from "./PlaylistChoice"
import { Playlist, Song } from "@/types"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Queue } from "@/structures/queue"

export const revalidate = 0

interface SongButtonProps {
    playlists: Playlist[]
    data: Song
}

const SongButton: React.FC<SongButtonProps> = ({ playlists = [], data }) => {
    const authModal = useAuth()
    const { user } = useUser()
    const [queue, setQueue] = useState(new Queue<Song>())

    const onClick = () => {
        if (!user) {
            return authModal.onOpen()
        }
    }

    useEffect(() => {
        // Cargar la fila de reproducción desde el almacenamiento local al iniciar
        const storedQueue = localStorage.getItem('playbackQueue');
        if (storedQueue) {
            const parsedQueue = JSON.parse(storedQueue);
            const newQueue = new Queue<Song>();
            parsedQueue.forEach((song: Song) => newQueue.enqueue(song));
            setQueue(newQueue);
        }
    }, []);

    useEffect(() => {
        // Guardar la fila de reproducción en el almacenamiento local cada vez que cambie
        localStorage.setItem('playbackQueue', JSON.stringify(queue.getItems()));
    }, [queue])
    
    const triggerEspecific = (
        <button className="flex items-center w-full px-2 py-2 mr-2 hover:bg-custom-color-6 rounded-md">
            <BiSolidPlaylist size={20} className="mr-2"/>
            <p>Agregar a la playlist</p>
        </button>
    )

    const handleAddToQueue = (song: Song) => {
        const newQueue = new Queue<Song>();
        let songAlreadyInQueue = false;

        // Recorremos la cola actual para verificar si la canción ya está presente
        queue.getItems().forEach(item => {
            if (item.id === song.id) {
                songAlreadyInQueue = true; // Marcar que la canción ya está en la cola
            } else {
                newQueue.enqueue(item); // Agregar todas las demás canciones a la nueva cola
            }
        });

        // Si la canción no estaba en la cola, la agregamos
        if (!songAlreadyInQueue) {
            newQueue.enqueue(song);
        }

        setQueue(newQueue)
    }

    const triggerGeneral = (
        <button className="
            rounded-full
            hover:bg-custom-color-6
            h-[30px]
            w-[30px]
            flex
            items-center
            justify-center
            "
            onClick={onClick}>
            <FaEllipsisV size={20}/>
        </button>
    )

    const contentEspecific = (
        <PlaylistChoice playlists={playlists} song1={data}/>
    )

    const router = useRouter()

    const openQueue = () => {
        router.push('/queue')
    }

    const contentGeneral = (
        <div>
            <div>
                <PopoverTemplate trigger={triggerEspecific} content={contentEspecific} />
            </div>
            <div>
                <button className="flex items-center w-full px-2 py-2 mr-2 hover:bg-custom-color-6 rounded-md"
                    onClick={() => handleAddToQueue(data)}>
                    <BsFillPlayCircleFill size={20} className="mr-2"/>
                    <p>Agregar a la fila</p>
                </button>
            </div>
            <div>
                <button className="flex items-center w-full px-2 py-2 mr-2 hover:bg-custom-color-6 rounded-md"
                    onClick={openQueue}>
                    <FaList size={20} className="mr-2" />
                    <p>Abrir la fila</p>
                </button>
            </div>
        </div>
    )

    return (
        <PopoverTemplate trigger={triggerGeneral} content={contentGeneral} />
    )
}
 
export default SongButton