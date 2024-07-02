"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Song } from "@/types";
import { useUser } from "@/hooks/useUser";
import SongModel2 from "@/components/SongModel2";

interface RecentContentProps {
    songs: Song[];
}
const RecentContent: React.FC<RecentContentProps> = ({ songs }) => {
    const router = useRouter();
    const {isLoading, user} = useUser();

    useEffect (() => {
        if(!isLoading && !user) {
            router.replace("/home");
        }
    }, [isLoading, user, router]);

    if(songs.length === 0) {
        return(
            <div className="text-center text-xl font-bold">
                No tienes canciones recientes
            </div>
        )
    }
  return (
    <div className="flex flex-col gap-2 h-56 overflow-y-auto px-2 ">
        {songs.map((song) => ( 
            <div key={song.id} className="">
                <SongModel2
                    onClick={() => {}}
                    data={song}
                />
            </div>
        ))}
    </div>
  )
}
export default RecentContent