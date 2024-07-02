import useLoadImage from "@/hooks/useLoadImage"
import { Song } from "@/types"
import Image from 'next/image'

interface SongModel1Props {
    data: Song
    onClick: (id: number) => void
}

const SongModel1:React.FC<SongModel1Props> = ({data, onClick}) => {
    const imagePath = useLoadImage(data)

    return (
        <div className="
            h-[200px] 
            w-[180px] 
            rounded-lg
            bg-custom-color-2
            hover:bg-custom-color-5
            flex
            justify-center
            items-center
            mr-4
            flex-col
            mb-2
            "
            onClick={() => onClick(data.id)}>
            
            <Image className="object-cover"
            src={imagePath || 'images/modalbg-pink.png'}
            fill
            alt="Image"
            />
            <div className="
                flex
                justify-center
                items-center
                ">
                <p>{data.title}</p>
            </div>
        </div>
    )
}
 
export default SongModel1