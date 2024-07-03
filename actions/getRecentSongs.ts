import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Song } from "@/types";

interface SongWithTimestamp {
    song: Song;
    timestamp: string;
}

// Función de QuickSort para ordenar por timestamp
const quickSort = (arr: SongWithTimestamp[]): SongWithTimestamp[] => {
    if (arr.length <= 1) return arr;

    const pivot = arr[Math.floor(arr.length / 2)].timestamp;
    const left = arr.filter(item => new Date(item.timestamp).getTime() > new Date(pivot).getTime());
    const right = arr.filter(item => new Date(item.timestamp).getTime() < new Date(pivot).getTime());
    const equal = arr.filter(item => item.timestamp === pivot);

    return [...quickSort(left), ...equal, ...quickSort(right)];
};

const getRecentSongs = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const {
        data: { session }
    } = await supabase.auth.getSession();

    if (!session?.user?.id) {
        console.log("No session found.");
        return [];
    }

    // Obtener la actividad del usuario
    const { data, error } = await supabase
        .from('user_activity')
        .select('*, songs(*)')
        .eq('user_id', session?.user?.id)
        .order('timestamp', { ascending: false });

    if (error) {
        console.log("Error fetching user activity:", error);
        return [];
    }

    if (!data) {
        console.log("No data found.");
        return [];
    }

    // Filtrar duplicados
    const songSet = new Set<number>();
    const recentSongsWithTimestamps: SongWithTimestamp[] = [];

    data.forEach(item => {
        const song: Song = item.songs;
        const timestamp: string = item.timestamp;

        if (!songSet.has(song.id)) {
            songSet.add(song.id);
            recentSongsWithTimestamps.push({ song, timestamp });
        }
    });

    // Ordenar las canciones por timestamp usando QuickSort
    const sortedSongsWithTimestamps = quickSort(recentSongsWithTimestamps);

    // 20 canciones únicas más recientes
    const recentSongs = sortedSongsWithTimestamps.slice(0, 20).map(item => item.song);

    return recentSongs;
};

export default getRecentSongs;
