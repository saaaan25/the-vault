"use client"

import Header from "@/components/Header"
import useAuth from "@/hooks/useAuth"
import useUpload from "@/hooks/useUpload"
import { useUser } from "@/hooks/useUser"

export default function Home() {
  const authModal = useAuth()
  const { user } = useUser()
  const uploadModal = useUpload()

  const onClick = () => {
    if (!user) {
      return authModal.onOpen()
    }

    return uploadModal.onOpen()
  }
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
            Recomendados
          </h1>
        </div>
        <div>
          <button className="
            bg-custom-color-3  
            border
            rounded-xl 
            border-black 
            h-fit 
            w-fit
            p-3
            mt-3
            flex
            items-center
            justify-center"
              onClick={onClick}>
            <p className="text-md">Agregar Canción</p>
          </button>
        </div>
      </div>
    </div>
  )
}
