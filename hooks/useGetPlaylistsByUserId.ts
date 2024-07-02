import { useEffect, useMemo, useState } from "react"
import { Playlist } from "@/types"
import { useSessionContext } from "@supabase/auth-helpers-react"
import toast from "react-hot-toast"

const useGetPlaylistsByUserId = (userId?: string) => {
    const [isLoadingPlaylists, setIsLoadingPlaylists] = useState(false)
    const [playlists, setPlaylists] = useState<Playlist[]>([])
    const { supabaseClient } = useSessionContext()

    useEffect(() => {
        if (!userId) {
            return
        }

        setIsLoadingPlaylists(true)

        const fetchPlaylists = async () => {
            const { data, error } = await supabaseClient
                .from('playlists')
                .select('*')
                .eq('user_id', userId)

            if (error) {
                setIsLoadingPlaylists(false)
                return toast.error(error.message)
            }

            setPlaylists(data as Playlist[])
            setIsLoadingPlaylists(false)
        }

        fetchPlaylists()
    }, [userId, supabaseClient])

    return useMemo(() => ({
        isLoadingPlaylists,
        playlists
    }), [isLoadingPlaylists, playlists])
}

export default useGetPlaylistsByUserId