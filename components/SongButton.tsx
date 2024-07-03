"use client";

import useAuth from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";
import { FaEllipsisV, FaList } from "react-icons/fa";
import PopoverTemplate from "./PopoverTemplate";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { BiSolidPlaylist } from "react-icons/bi";
import PlaylistChoice from "./PlaylistChoice";
import { Playlist, Song } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useQueue } from "@/hooks/useQueue";

export const revalidate = 0;

interface SongButtonProps {
  playlists: Playlist[];
  data: Song;
}

const SongButton: React.FC<SongButtonProps> = ({ playlists = [], data }) => {
    const authModal = useAuth();
    const { user } = useUser();

    const onClick = () => {
        if (!user) {
        return authModal.onOpen();
        }
    };

    const triggerEspecific = (
        <button className="flex items-center w-full px-2 py-2 mr-2 hover:bg-custom-color-6 rounded-md">
        <BiSolidPlaylist size={20} className="mr-2" />
        <p>Agregar a la playlist</p>
        </button>
    );

    const { addToQueue, isInQueue } = useQueue()

    const handleAddToQueue = () => {
        if (isInQueue(data)) {
            toast.error(`${data.title} ya está en la cola`);
        } else {
            addToQueue(data);
            toast.success(`${data.title} añadido a la cola`);
        }
    };

    const triggerGeneral = (
        <button
        className="
            rounded-full
            hover:bg-custom-color-6
            h-[30px]
            w-[30px]
            flex
            items-center
            justify-center
        "
        onClick={onClick}
        >
        <FaEllipsisV size={20} />
        </button>
    );

    const contentEspecific = <PlaylistChoice playlists={playlists} song1={data} />;

    const router = useRouter();

    const openQueue = () => {
        router.push("/queue");
    };

    const contentGeneral = (
        <div>
            <div>
                <PopoverTemplate trigger={triggerEspecific} content={contentEspecific} />
            </div>
            <div>
                <button
                className="flex items-center w-full px-2 py-2 mr-2 hover:bg-custom-color-6 rounded-md"
                onClick={handleAddToQueue}
                >
                <BsFillPlayCircleFill size={20} className="mr-2" />
                <p>Agregar a la fila</p>
                </button>
            </div>
            <div>
                <button
                className="flex items-center w-full px-2 py-2 mr-2 hover:bg-custom-color-6 rounded-md"
                onClick={openQueue}
                >
                <FaList size={20} className="mr-2" />
                <p>Abrir la fila</p>
                </button>
            </div>
        </div>
    );

    return <PopoverTemplate trigger={triggerGeneral} content={contentGeneral} />;
};

export default SongButton;
