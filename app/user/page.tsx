import Header from "@/components/Header";
import UserInfo from "@/components/UserInfo";
import getLikedSongs from "@/actions/getLikedSongs";
import getRecentSongs from "@/actions/getRecentSongs";
import LikedContent from "./components/LikedContent";
import RecentContent from "./components/RecentContent";
export const revalidate = 0;
const User = async () => {
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
      <div className="mb-2 ml-14 h-auto grid grid-cols-[0.8fr_1fr] gap-32 container">
        <div className="w-full text-center">
          <div className="flex justify-between items-center">
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
          <UserInfo
            name="Nombre de usuario"
            avatar="https://randomuser.me/api/portraits"
            description="Descripcion de usuario"
          />
          <button className="bg-custom-color px-4 py-2 rounded-lg text-3xl mt-4 w-full">
            Personalizar tema
          </button>
        </div>
        <div className="w-full mt-16">
          <div
            className="
                    bg-custom-color-3 rounded-lg p-6 w-[720px] mb-10
                    "
          >
            <h2 className="text-2xl font-bold mb-4">
              Historial de reproduccion
            </h2>
            <RecentContent songs={recent} />
          </div>
          <div
            className="
                    bg-custom-color-6 rounded-lg p-6 w-[720px]
                    "
          >
            <h2 className="text-2xl font-bold mb-4">Canciones favoritas</h2>
            <LikedContent songs={songs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
