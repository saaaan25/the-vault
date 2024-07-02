import getPlaylistsByUserId from "@/actions/getPlaylistsByUserId"
import getSongsByUserId from "@/actions/getSongsByUserId"
import Header from "@/components/Header"
import PlaylistContent from "@/app/playlist/components/PlaylistContent"

const User = async() => {
    const userSongs = await getSongsByUserId()
    const userPlaylists = await getPlaylistsByUserId()
    return (
        <div className=" 
            bg-custom-color-2 
            text-black 
            h-full 
            w-full 
            overflow-hidden 
            overflow-y-auto
            ">
            <Header>
                <></>
            </Header>
            <div className="mb-2 ml-14">
                <div className="
                    flex 
                    justify-between 
                    items-center">
                    <h1 className="
                        text-black
                        text-2xl
                        font-bold
                        ">
                        Tu biblioteca
                    </h1>
                </div>
                <PlaylistContent playlists={userPlaylists} songs={userSongs}/>
            </div>
        </div>
    )
}
 
export default User