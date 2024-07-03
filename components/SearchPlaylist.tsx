"use client"

import { busquedaBinaria, ordenarPorTitulo } from "@/structures/binarysearch";
import { Playlist } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react"
import toast from "react-hot-toast";
import { BiSearch } from "react-icons/bi"

interface SearchPlaylistProps {
    playlists: Playlist[]
}

const SearchPlaylist: React.FC<SearchPlaylistProps> = ({playlists = []}) => {
    const [inputValue, setInputValue] = useState('')
    const router = useRouter()

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const handleButtonClick = () => {
        console.log('El valor del input es:', inputValue)
        const playlistsInOrder = ordenarPorTitulo(playlists)
        const id = busquedaBinaria(playlistsInOrder, inputValue)

        if (id !== null) {
            toast.success(`Redirigiendo a ${inputValue} ...`)
            router.push(`/playlist/${id}`)
        } else {
            toast.error(`No se encontro ${inputValue}`)
        }
    }

    return (
        <div className="
            bg-custom-color-3
            border 
            border-black
            rounded-md
            h-[30px]
            w-[270px]
            text-sm
            pl-2
            flex
            items-center 
            justify-between">
            <input  className="
                w-full
                h-full
                bg-custom-color-3"   
                placeholder="Busca una playlist"
                type="text"
                value={inputValue}
                onChange={handleInputChange}>
            </input>
            <button className="h-[30px] w-[30px] flex justify-center items-center"
                    onClick={handleButtonClick}>
                <BiSearch/>
            </button>
        </div>
    );
}

export default SearchPlaylist