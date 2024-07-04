"use client";

import { Song, Playlist } from "@/types";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import SongButton from "./SongButton";
import useOnPlay from "@/hooks/useOnPlay";
import { useRecentSearch } from "@/hooks/useRecentSearch";
import { useEffect } from "react";
import SongModel2 from "./SongModel2";

interface SearchContentProps {
   songs: Song[];
   playlists: Playlist[];
}
const SearchContent: React.FC<SearchContentProps> = ({ songs, playlists }) => {
   const onPlay = useOnPlay(songs);
   const {queue, addToRecent, removeFromRecent} = useRecentSearch();
   useEffect(() => {
      if (songs.length === 1) {
         if (queue.size() >= 5){
            removeFromRecent()
         }
         addToRecent(songs[0])
      }
   }, [])

   if (songs.length === 0) {
      return (
         <div className="flex flex-col gap-y-2 w-full px-12 text-neutral-400">
            No hay canciones
         </div>
      )
   }
   return (
      <div className="group flex flex-col gap-y-2 w-full pl-12 pr-5">
         {songs.map((item) => (
                <SongModel2 
                key={item.id}
                onClick={() => {}}
                data={item}
                playlists={[]}
                />
            ))}
      </div>
   )
}
export default SearchContent;