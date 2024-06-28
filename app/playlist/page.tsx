import getPlaylistsByUserId from "@/actions/getPlaylistsByUserId"
import getSongsByUserId from "@/actions/getSongsByUserId"
import Header from "@/components/Header"
import PlaylistContent from "@/components/PlaylistContent"
import { usePlaylist } from "@/providers/PlaylistProvider"

const PlaylistPage = async() => {
    const userSongs = await getSongsByUserId()
    const userPlaylists = await getPlaylistsByUserId()

    const { playlists } = usePlaylist()

    return (
        <div className=" 
            bg-custom-color-2 
            text-black 
            h-full 
            w-full 
            overflow-hidden 
            overflow-y-auto
            flex
            flex-col
            ">
            <Header>
                <></>
            </Header>
            <div className="mb-2 ml-14 mr-14">
                <div className="
                    flex 
                    justify-between 
                    items-center
                    ">
                    <h1 className="
                        text-black
                        text-2xl
                        font-bold
                        ">
                        Tu biblioteca
                    </h1>
                </div>
                <div className="flex mt-6">
                    <PlaylistContent songs={userSongs} playlists={userPlaylists}/>
                </div>
            </div>
        </div>
    )
}
 
export default PlaylistPage