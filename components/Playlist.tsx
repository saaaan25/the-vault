"use client"

import useLoadImageP from "@/hooks/useLoadImageP"
import { usePlaylist } from "@/providers/PlaylistProvider"
import type { Playlist } from "@/types"
import Image from 'next/image'
import { useRouter } from "next/navigation"
import { useMemo } from "react"

interface PlaylistItemProps {
    data: Playlist
}

const PlaylistItem:React.FC<PlaylistItemProps> = ({data}) => {
    const imagePath = useLoadImageP(data)
    const router = useRouter()
    
    const onClick = () => {
        router.push(`/playlist/${data.id}`) //${data.name}
    }

    return (
        <button className="
                relative
                group
                flex
                flex-col
                items-center
                justify-center
                mr-5
                rounded-md
                gap-x-4
                bg-custom-color-3
                cursor-pointer
                hover-bg-custom-color-3
                transition
                p-3
            "
            onClick={onClick}>
            
            <div className="
                relative
                bg-custom-color-3
                border-black
                aspect-square
                w-[95%]
                h-full
                rounded-lg
                ">
                <Image
                    className="object-cover"
                    src={imagePath || '/images/portadapredet.png'}
                    fill
                    alt="Image"
                    style={{ borderRadius: '5px' }}
                />
            </div>
            <div className="
                flex
                justify-center
                items-center
                text-sm
                mt-2
                ">
                <p>{data.name}</p>
            </div>
        </button>
    )
}
 
export default PlaylistItem