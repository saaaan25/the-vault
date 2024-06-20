import getSongs from "@/actions/getSongs"
import Header from "@/components/Header"
import PlaylistContent from "@/components/PlaylistContent"

const PlaylistPage = async() => {
    const songs = await getSongs()

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
                    <PlaylistContent songs={songs} />
                </div>
            </div>
        </div>
    )
}
 
export default PlaylistPage