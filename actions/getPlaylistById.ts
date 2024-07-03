import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getPlaylistById = async (id: number) => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const { data, error } = await supabase.from('playlists').select('*, songs(*)').eq('id', id).single();

    if (error) {
        console.log(error.message);
        return null;
    }

    return data;
}

export default getPlaylistById;
