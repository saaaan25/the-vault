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
import usePlayer from "@/hooks/usePlayer"
import { useEffect, useRef, useState } from "react"
import useSound from "use-sound"
import { useQueue } from "@/hooks/useQueue"

interface PlayerContentProps {
    song: Song
    songUrl: string
}

const PlayerContent: React.FC<PlayerContentProps> = ({
    song,
    songUrl
}) => {
    const imagePath = useLoadImage(song)
    const player = usePlayer()
    const [volume, setVolume] = useState(1)
    const [isPlaying, setIsPlaying] = useState(false)
    const { removeFromQueue } = useQueue()

    const router = useRouter()

    const openQueue = () => {
        router.push('/queue')
    }

    const Icon = isPlaying ? BsPauseFill : BsPlayFill
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave

    const onPlayNext = () => {
        if (player.ids.length === 0) {
            return
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId)
        const nextSong = player.ids[currentIndex + 1]

        if (!nextSong) {
            return player.setId(player.ids[0])
        }

        player.setId(nextSong)
    }

    const onPlayPrevious = () => {
        if (player.ids.length === 0) {
            return
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId)
        const previousSong = player.ids[currentIndex - 1]

        if (!previousSong) {
            return player.setId(player.ids[player.ids.length - 1])
        }

        player.setId(previousSong)
    }

    const [play, {pause, sound}] = useSound( songUrl, { 
        volume: volume,
        onplay: () => setIsPlaying(true),
        onend: () => {
            setIsPlaying(false)
            onPlayNext()
            removeFromQueue()
        },
        onpause: () => setIsPlaying(false),
        format: ['mp3']
    } )

    useEffect(() => {
        sound?.play()

        return () => {
            sound?.unload()
        }
    }, [sound])

    const handlePlay = () => {
        if (!isPlaying) {
            play()
        } else {
            pause()
        }
    }

    const toggleMute = () => {
        if (volume === 0) {
            setVolume(1)
        } else {
            setVolume(0)
        }
    }

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
                    flex-col
                    w-full
                    justify-center
                    items-center
                    gap-x-4
                    ">
                <div className="
                    flex
                    col-auto
                    w-full
                    justify-center
                    items-center
                    gap-x-4
                    ">
                    <div>
                        <AiFillStepBackward size={30} onClick={onPlayPrevious}/>
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
                            onClick={handlePlay}>
                        <Icon size={30}
                            className="text-custom-color-3 bg-black"/>
                    </div>
                    <div>
                        <AiFillStepForward size={30} onClick={onPlayNext}/>
                    </div>
                </div>
                <div>
                </div> 
            </div>
            <div className="flex justify-end gap-x-3 pr-5 items-center w-full">
                <LikeButton songId={song.id}/>
                <div className="flex gap-x-1 w-[100px] items-center">
                    <VolumeIcon 
                    onClick={toggleMute}
                    className="cursor-pointer"
                    size={25}/>
                    <Slider 
                        value={volume}
                        onChange={(value) => setVolume(value)}
                        ariaLabel="volume"
                        showThumb={false}/>
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