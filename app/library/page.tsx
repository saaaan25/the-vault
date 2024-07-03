import getPlaylistsByUserId from "@/actions/getPlaylistsByUserId"
import Header from "@/components/Header"
import LibraryContent from "@/app/library/components/LibraryContent"
import UploadPlaylistModal from "@/components/UploadPlaylistModal"
import SearchPlaylist from "@/components/SearchPlaylist"

export const revalidate = 0

export default async function Library() {
    const userPlaylists = await getPlaylistsByUserId()

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
                        mb-3
                        ">
                        Tu biblioteca
                    </h1>
                    <div className="flex justify-end">
                        <SearchPlaylist playlists={userPlaylists}/>
                    </div>
                </div>
                <div className="flex mt-6">
                    <LibraryContent playlists={userPlaylists}/>
                </div>
            </div>
            <UploadPlaylistModal/>
        </div>
    )
}