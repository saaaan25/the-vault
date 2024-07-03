import { Playlist } from "@/types"
import { SupabaseClient, useSupabaseClient } from "@supabase/auth-helpers-react"

const useLoadImageP = (playlist : Playlist | null) => {
    const supabaseClient = useSupabaseClient()

    if(!playlist) {
        return null
    }

    const { data: imageData } = supabaseClient.storage.from('images').getPublicUrl(playlist.image_path)

    return imageData.publicUrl
}

export default useLoadImageP