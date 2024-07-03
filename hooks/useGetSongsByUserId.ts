import { useEffect, useMemo, useState } from "react"
import { Song } from "@/types"
import { useSessionContext } from "@supabase/auth-helpers-react"
import toast from "react-hot-toast"

const useGetSongsByUserId = (userId?: string) => {
    const [isLoadingSongs, setIsLoadingSongs] = useState(false)
    const [songs, setSongs] = useState<Song[]>([])
    const { supabaseClient } = useSessionContext()

    useEffect(() => {
        if (!userId) {
            return
        }

        setIsLoadingSongs(true)

        const fetchPlaylists = async () => {
            const { data, error } = await supabaseClient
                .from('songs')
                .select('*')
                .eq('user_id', userId)

            if (error) {
                setIsLoadingSongs(false)
                return toast.error(error.message)
            }

            setSongs(data as Song[])
            setIsLoadingSongs(false)
        }

        fetchPlaylists()
    }, [userId, supabaseClient])

    return useMemo(() => ({
        isLoadingSongs,
        songs
    }), [isLoadingSongs, songs])
}

export default useGetSongsByUserId