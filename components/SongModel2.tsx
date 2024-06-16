import { FaEllipsisV } from "react-icons/fa"

interface SongModel2Props {
    song: string
    artist: string
    album: string
    duration: string
}


const SongModel2:React.FC<SongModel2Props> = ({song, artist, album, duration}) => {
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
            ">
            <div className="
                ml-6
                mr-4
                bg-custom-color
                border
                border-black
                rounded-xl
                h-[58px]
                w-[58px]
            ">
            </div>
            <div className="
                flex 
                justify-between 
                w-[85%]
                ">
                <div className="flex-col">
                    <p className="font-bold">{song}</p>
                    <p className="text-sm">{artist}</p>
                </div>
                <div className="flex items-center">
                    <p className="text-sm">{album}</p>
                </div>
                <div className="flex items-center">
                    <p className="text-sm">{duration}</p>
                </div>
            </div>
            <div className="
                w-[7%] 
                flex 
                justify-center
                ">
                <button className="
                    rounded-full
                    hover:bg-custom-color-6
                    h-[30px]
                    w-[30px]
                    flex
                    items-center
                    justify-center
                    ">
                    <FaEllipsisV size={20}/>
                </button>
            </div>
        </div>
    )
}
 
export default SongModel2