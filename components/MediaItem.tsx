"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import OptionsButton from "./OptionsButton";

interface MediaItemProps {
   data: Song;
   onClick?: (id: number) => void;
}
const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
   const imageUrl = useLoadImage(data);

   const handleClick = () => {
      if (onClick) {
         onClick(data.id);
      }
   }
   return (
      <div
         onClick={handleClick}
         className="flex items-center gap-x-3 hover:bg-custom-color-3 w-full p-2 rounded-md"
      >
         <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
            <Image
               fill
               src={imageUrl || "/images/portadapredet.png"}
               alt="Carátula"
               className="object-cover"
            />
         </div>
         <div className="flex flex-col gap-y-1 overflow-hidden">
            <p className="truncate font-semibold">{data.title}</p>
            <p className="text-neutral-400 truncate">{data.autor}</p>
         </div>
         <div className="flex-jusify-end ml-auto">
            <OptionsButton />
         </div>
      </div>
   );
};
export default MediaItem;