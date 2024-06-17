"use client"

import Header from "@/components/Header"
import Playlist from "@/components/Playlist"
import SongModel1 from "@/components/SongModel1"
import SongModel2 from "@/components/SongModel2"
import useAuth from "@/hooks/useAuth"
import useUpload from "@/hooks/useUpload"
import { useUser } from "@/hooks/useUser"

const Library = () => {
    const authModal = useAuth()
    const { user } = useUser()
    const uploadModal = useUpload()

    const onClick = () => {
        if (!user) {
            return authModal.onOpen()
        }

        return uploadModal.onOpen()
    }
    return (
        <div className=" 
            bg-custom-color-2 
            text-black 
            h-full 
            w-full 
            overflow-hidden 
            overflow-y-auto
            ">
            <Header>
                <></>
            </Header>
            <div className="mb-2 ml-14 mr-14">
                <div className="
                    flex 
                    justify-between 
                    items-center
                    ">
                    <h1 className="
                        text-black
                        text-2xl
                        font-bold
                        ">
                        Tu biblioteca
                    </h1>
                </div>
                <div className="mt-4 flex">
                    <Playlist playlist="Playlist 1"/>
                    <Playlist playlist="Playlist 2"/>
                    <div className="
                        h-[200px] 
                        w-[180px] 
                        rounded-lg
                        bg-custom-color-2
                        flex
                        justify-center
                        ">
                        <button className="
                            bg-custom-color-3  
                            border
                            rounded-xl 
                            border-black 
                            h-[150px] 
                            w-[150px]
                            mt-3
                            flex
                            items-center
                            justify-center"
                            onClick={onClick}>
                            <p className="font-thin text-9xl">+</p>
                        </button>
                    </div>
                </div>
                <div>
                    <SongModel1 song="Canción 1"/>
                </div>
                <div>
                    <SongModel2 song="Canción 2" autor="Artista 2" album="Album 2" duration="11:16"/>
                </div>
            </div>
        </div>
    )
}
 
export default Library