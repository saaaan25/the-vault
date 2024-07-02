"use client"

import useLoadImage from "@/hooks/useLoadImage"
import { Song } from "@/types"
import Image from "next/image"
import LikeButton from "./LikeButton"
import { FaList } from "react-icons/fa"
import { BsPauseFill, BsPlayFill } from "react-icons/bs"
import { useRouter } from "next/navigation"
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai"
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2"
import Slider from "./Slider"

interface PlayerContentProps {
    key: string
    song: Song
    songUrl: string
}

const PlayerContent: React.FC<PlayerContentProps> = ({
    key,
    song,
    songUrl
}) => {
    const imagePath = useLoadImage(song)

    const router = useRouter()

    const openQueue = () => {
        router.push('/queue')
    }

    const Icon = true ? BsPauseFill : BsPlayFill
    const VolumeIcon = true ? HiSpeakerXMark : HiSpeakerWave

    return (
        <div className="grid grid-cols-3 h-full">
            <div className="flex w-full justify-start items-center">
                <div>
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
                    </div>
                </div>
                <div className="
                        flex  
                        flex-col
                        ">
                    <p className="font-bold">{song.title}</p>
                    <p className="text-sm">{song.autor}</p> 
                </div>
            </div>
            <div className="
                    flex
                    col-auto
                    w-full
                    justify-center
                    items-center
                    gap-x-4
                    ">
                <div>
                    <AiFillStepBackward size={30} onClick={() => {}}/>
                </div>
                <div className="
                        h-10
                        w-10
                        flex
                        items-center
                        justify-center
                        rounded-full
                        bg-black
                        cursor-pointer
                        p-1.5
                        "
                        onClick={() => {}}>
                    <Icon size={30}
                        className="text-custom-color-3 bg-black"/>
                </div>
                <div>
                    <AiFillStepForward size={30} onClick={() => {}}/>
                </div>
            </div>
            <div className="flex justify-end gap-x-3 pr-5 items-center w-full">
                <LikeButton songId={song.id}/>
                <div className="flex gap-x-1 w-[100px] items-center">
                    <VolumeIcon 
                    onClick={() => {}}
                    className="cursor-pointer"
                    size={25}/>
                    <Slider />
                </div>
                <button className="flex 
                            rounded-full 
                            hover:bg-custom-color-6 
                            h-fit
                            p-2 
                            items-center 
                            justify-center
                            "
                            onClick={openQueue}>
                    <FaList size={20} className=""/>
                </button>
            </div>
        </div>
    )
}
 
export default PlayerContent