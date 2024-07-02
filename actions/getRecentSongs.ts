import { Song } from "@/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const getRecentSongs = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    })

    const {
        data: {
            session
        }
    } = await supabase.auth.getSession();

    const { data, error } = await supabase
    .from('user_activity')
    .select(`*,songs(*)`)
    .eq('user_id', session?.user?.id)
    .order('timestamp', { ascending: false })
    .limit(10);

    if (error) {
        console.log(error)
        return []
    }
    if (!data) {
        return []
    }
    return data.map((item) => ({
        ...item.songs
    }))
}

export default getRecentSongs