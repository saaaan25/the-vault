import getPlaylists from "@/actions/getPlaylists"
import getSongs from "@/actions/getSongs"
import AddPlaylistButton from "@/components/AddPlaylistButton"
import Header from "@/components/Header"
import LibraryContent from "@/components/LibraryContent"
import UploadPlaylistModal from "@/components/UploadPlaylistModal"

export const revalidate = 0

export default async function Library() {
    const playlists = await getPlaylists()

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
                    <LibraryContent playlists={playlists}/>
                </div>
            </div>
            <UploadPlaylistModal/>
        </div>
    )
}