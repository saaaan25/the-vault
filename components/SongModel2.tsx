import { Playlist, Song } from "@/types"
import Image from 'next/image'
import useLoadImage from "@/hooks/useLoadImage"
import PlayButton from "./PlayButton"
import LikeButton from "./LikeButton"
import SongButton from "./SongButton"

interface SongModel2Props {
    data: Song
    onClick: (id: number) => void
    playlists: Playlist[]
}

const SongModel2:React.FC<SongModel2Props> = ({ data, onClick, playlists = [] }) => {
    const imagePath = useLoadImage(data)

    return (
        <div className="
            bg-custom-color-2 
            hover:bg-custom-color-3 
            w-full
            h-[80px]
            flex
            items-center
            rounded-lg
            justify-between
            pr-3
            "
            onClick={() => onClick(data.id)}>
            <div className="
                ml-6
                mr-4
                rounded-xl
                h-[58px]
                w-[58px]
                relative
                flex
                items-center
                justify-center
            ">
                <Image
                    className="object-cover"
                    src={ imagePath || '/images/portadapredet.png'}
                    alt="Image"
                    width={110}
                    height={110}
                    style={{ borderRadius: '5px' }}
                />
                <div className="
                    absolute
                    ">
                    <PlayButton />
                </div>
            </div>
            <div className="
                flex  
                w-[80%]
                ">
                <div className="flex-col">
                    <p className="font-bold">{data.title}</p>
                    <p className="text-sm">{data.autor}</p>
                </div>
            </div>
            <div className="
                w-[full] 
                flex 
                justify-center
                gap-x-3
                ">
                <div className="flex items-center">
                    <LikeButton songId={data.id}/>
                </div>
                <div>
                    <SongButton playlists={playlists} data={data}/>
                </div>
            </div>
        </div>
    )
}
 
export default SongModel2