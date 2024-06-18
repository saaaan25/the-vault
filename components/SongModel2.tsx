import { Song } from "@/types"
import { FaEllipsisV } from "react-icons/fa"
import Image from 'next/image'
import useLoadImage from "@/hooks/useLoadImage"

interface SongModel2Props {
    data: Song
    onClick: (id: string) => void
}

const SongModel2:React.FC<SongModel2Props> = ({ data, onClick }) => {
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
            ">
            <div className="
                ml-6
                mr-4
                border
                rounded-xl
                h-[58px]
                w-[58px]
            ">
                <Image
                    className="object-cover"
                    src={imagePath || '/images/portadapredet.png'}
                    alt="Image"
                    width={100}
                    height={100}
                    style={{ borderRadius: '5px' }}
                />
            </div>
            <div className="
                flex 
                justify-between 
                w-[85%]
                ">
                <div className="flex-col">
                    <p className="font-bold">{data.title}</p>
                    <p className="text-sm">{data.autor}</p>
                </div>
                <div className="flex items-center">
                    <p className="text-sm"></p>
                </div>
                <div className="flex items-center">
                    <p className="text-sm"></p>
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