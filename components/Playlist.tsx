import PlaylistPage from "@/app/playlist/page"
import useLoadImageP from "@/hooks/useLoadImageP"
import { usePlaylist } from "@/providers/PlaylistProvider"
import type { Playlist } from "@/types"
import Image from 'next/image'
import { useRouter } from "next/navigation"
import { useMemo } from "react"

interface PlaylistItemProps {
    data: Playlist
    onClick: () => void
    href: string
}

const PlaylistItem:React.FC<PlaylistItemProps> = ({data, href}) => {
    const imagePath = useLoadImageP(data)
    const router = useRouter()
    
    const onClick = () => {
        router.push(`/playlist`)
    }

    return (
        <button className="
            relative
            groups
            gap-x-5
            rounded-lg
            bg-custom-color-5
            hover:bg-custom-color-3
            flex
            justify-center
            items-center
            mr-4
            mb-2
            p-3
            flex-col
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