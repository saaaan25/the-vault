"use client";

import { Song, Playlist } from "@/types";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import SongButton from "./SongButton";
import useOnPlay from "@/hooks/useOnPlay";

interface SearchContentProps {
   songs: Song[];
   playlists: Playlist[];
}
const SearchContent: React.FC<SearchContentProps> = ({ songs, playlists }) => {
   const onPlay = useOnPlay(songs);
   if (songs.length === 0) {
      return (
         <div className="flex flex-col gap-y-2 w-full px-12 text-neutral-400">
            No hay canciones
         </div>
      )
   }
   return (
      <div className="group flex flex-col gap-y-2 w-full pl-12 pr-5">
         {songs.map((song) => (
            <div key={song.id} className="flex items-center gap-x-4 w-full">
               <div className="flex-1">
                  <MediaItem
                     onClick={(id: number) => onPlay(id)}
                     data={song}
                  />
               </div>
               <LikeButton songId={song.id} />
               <SongButton playlists={playlists} data={song} />
            </div>
         ))}
      </div>
   )
}
export default SearchContent;