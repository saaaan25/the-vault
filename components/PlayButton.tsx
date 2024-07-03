import { Song } from "@/types"
import { FaPlay } from "react-icons/fa"

interface PlayButtonProps {
    onClick: (id: number) => void
    data: Song
}

const PlayButton: React.FC<PlayButtonProps> = ({onClick, data}) => {
    return (
        <button className="
            transition
            opacity-0
            hover:opacity-100
            group-hover:opacity-100
            rounded-full
            flex
            items-center
            justify-center
            bg-black
            p-3
            "
            onClick={() => onClick(data.id)}>
            <FaPlay className="text-custom-color-2"/>
        </button>
    )
}
 
export default PlayButton