import useLoadImageP from "@/hooks/useLoadImageP"
import type { Playlist } from "@/types"
import Image from 'next/image'
import Link from "next/link"

interface PlaylistItemProps {
    data: Playlist
    onClick: (id: string) => void
}

const PlaylistItem:React.FC<PlaylistItemProps> = ({data, onClick}) => {
    const imagePath = useLoadImageP(data)

    return (
        <Link className="
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
            onClick={() => onClick(data.id)}
            href="/playlist">
            
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
        </Link>
    )
}
 
export default PlaylistItem