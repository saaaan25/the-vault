import useLoadImage from "@/hooks/useLoadImage"
import { Playlist, Song } from "@/types"
import Image from 'next/image'
import PlayButton from "./PlayButton"
import SongButton from "./SongButton"

interface SongModel1Props {
    data: Song
    onClick: (id: number) => void
    playlists: Playlist[]
}

const SongModel1:React.FC<SongModel1Props> = ({data, onClick, playlists}) => {
    const imagePath = useLoadImage(data)
    return (
        <div
            onClick={() => onClick(data.id)}
            className="
                relative
                group
                flex
                flex-col
                items-center
                justify-center
                mr-5
                rounded-md
                overflow-hidden
                gap-x-4
                bg-custom-color-3
                cursor-pointer
                hover:bg-custom-color-5
                transition
                p-3
            "
        >
            <div
                className="
                relative
                aspect-square
                w-full
                h-full
                rounded-md
                overflow-hidden
                "
            >
                <Image 
                    className="object-cover" 
                    src={imagePath || '/images/pink-heart-hi.png'}  
                    fill
                    alt="Image"         
                />
            </div>
            <div className="flex justify-start w-full">
                <div className="flex flex-col items-start w-full pt-4 gap-y-1">
                    <p className="font-semibold truncate w-full">
                    {data.title} 
                    </p>
                    <p
                        className="
                            text-sm
                            pb-0
                            w-full
                            truncate
                        "
                    >
                    {data.autor} 
                    </p>
                </div>
                <div className="flex items-center justify-end">
                    <SongButton data={data} playlists={playlists}/>
                </div>
                
            </div>
            <div className="
                absolute
                bottom-20
                right-5">
                <PlayButton />
            </div>
        </div>
    )
}
 
export default SongModel1