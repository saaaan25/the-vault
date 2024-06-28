"use client";

import { Song } from "@/types";
import MediaItem from "./MediaItem";

interface SearchContentProps {
   songs: Song[]
}
const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
   if (songs.length === 0) {
      return (
         <div className="flex flex-col gap-y-2 w-full px-12 text-neutral-400">
            No hay canciones
         </div>
      )
   }
   return (
      <div className="flex flex-col gap-y-2 w-full pl-12 pr-5">
         {songs.map((song) => (
            <div key={song.id} className="flex items-center gap-x-4 w-full">
               <div className="flex-1">
                  <MediaItem
                     onClick={() => { }}
                     data={song}
                  />
               </div>
            </div>
         ))}
      </div>
   )
}
export default SearchContent;