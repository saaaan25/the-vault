import Header from "@/components/Header";
import getLikedSongs from "@/actions/getLikedSongs";
import getRecentSongs from "@/actions/getRecentSongs";
import LikedContent from "./components/LikedContent";
import RecentContent from "./components/RecentContent";
import getPlaylistsByUserId from "@/actions/getPlaylistsByUserId"
import getSongsByUserId from "@/actions/getSongsByUserId"
import PlaylistContent from "@/app/playlist/components/PlaylistContent"
export const revalidate = 0;

const User = async () => {
  const userSongs = await getSongsByUserId()
  const userPlaylists = await getPlaylistsByUserId()
  const songs = await getLikedSongs();
  const recent = await getRecentSongs();
  return (
    <div
      className=" 
            bg-custom-color-2 
            text-black 
            h-full 
            w-full 
            overflow-hidden 
            overflow-y-auto
            "
    >
      <Header>
        <></>
      </Header>
      <div className="mb-2 ml-14 mr-4 h-auto grid grid-cols-[1fr_1fr] gap-32 container">
        {/* Espacio pa joar */}
        <div className="w-full text-center">

            <h1
              className="
                        text-black
                        text-2xl
                        font-bold
                        "
            >
              Perfil
            </h1>          

        </div>
        {/* A partir de aquí ya es el div de las canciones */}
        <div className="w-full">
          <div
            className="
                    bg-custom-color-3 rounded-lg px-6 pt-4 pb-2 w-[700px] mb-6
                    "
          >
            <h2 className="text-2xl font-bold mb-2">
              Historial de reproduccion
            </h2>
            <RecentContent songs={recent} playlists={userPlaylists} />
          </div>
          <div
            className="
                    bg-custom-color-3 rounded-lg px-6 pt-4 pb-2 w-[700px]
                    "
          >
            <h2 className="text-2xl font-bold mb-4">Canciones favoritas</h2>
            <LikedContent songs={songs} playlists={userPlaylists}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
