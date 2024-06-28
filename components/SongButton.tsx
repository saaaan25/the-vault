import useAuth from "@/hooks/useAuth"
import { useUser } from "@/hooks/useUser"
import { FaEllipsisV } from "react-icons/fa"
import PopoverTemplate from "./PopoverTemplate"
import { useEffect, useState } from "react"
import { RiDeleteBin2Line } from "react-icons/ri"
import { BsFillPlayCircleFill } from "react-icons/bs"
import { BiSolidPlaylist } from "react-icons/bi"
import PlaylistChoice from "./PlaylistChoice"
import getPlaylistsByUserId from "@/actions/getPlaylistsByUserId"
import { Playlist, Song } from "@/types"

export const revalidate = 0

interface SongButtonProps {
    playlists: Playlist[]
    data: Song
}

const SongButton: React.FC<SongButtonProps> = ({ playlists = [], data }) => {
    const authModal = useAuth()
    const { user } = useUser()

    const onClick = () => {
        if (!user) {
            return authModal.onOpen()
        }
        console.log('ola')
    }
    
    const triggerEspecific = (
        <button className="flex items-center w-full px-2 py-2 mr-2 hover:bg-custom-color-6 rounded-md">
            <BiSolidPlaylist size={20} className="mr-2"/>
            <p>Agregar a la playlist</p>
        </button>
    )

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

    const contentGeneral = (
        <form>
            <div>
                <PopoverTemplate trigger={triggerEspecific} content={contentEspecific} />
            </div>
            <div>
                <button className="flex items-center w-full px-2 py-2 mr-2 hover:bg-custom-color-6 rounded-md">
                    <BsFillPlayCircleFill size={20} className="mr-2"/>
                    <p>Agregar a la fila</p>
                </button>
            </div>
            <div>
                <button className="flex items-center w-full px-2 py-2 mr-2 hover:bg-custom-color-6 rounded-md">
                    <RiDeleteBin2Line size={20} className="mr-2"/>
                    <p>Eliminar de la playlist</p>
                </button>
            </div>
        </form>
    )

    return (
        <PopoverTemplate trigger={triggerGeneral} content={contentGeneral} />
    )
}
 
export default SongButton