import { FaPlay } from "react-icons/fa"

const PlayButton = () => {
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
            ">
            <FaPlay className="text-custom-color-2"/>
        </button>
    )
}
 
export default PlayButton