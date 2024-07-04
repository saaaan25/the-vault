import SongModel2 from "@/components/SongModel2";
import useOnPlay from "@/hooks/useOnPlay";
import { Playlist, Song } from "@/types";

interface QueueContentProps {
    list: Song[];
    playlists: Playlist[];
}

const QueueContent: React.FC<QueueContentProps> = ({ list, playlists }) => {
    const onPlay = useOnPlay(list)

    return (
        <div className="w-full">
            {list.map((item) => (
                <SongModel2
                    key={item.id}
                    onClick={(id: number) => onPlay(id)}
                    data={item}
                    playlists={playlists}
                />
            ))}
        </div>
    );
};

export default QueueContent;