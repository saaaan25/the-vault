"use client"
import Header from "@/components/Header"
import { useRouter } from "next/navigation"
import { IoMdClose } from "react-icons/io"

const QueuePage = () => {
    const router = useRouter()

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
                        Fila de reproducción
                    </h1>
                    <div>
                        <button onClick={() => router.back()}>
                            <IoMdClose />
                        </button>
                    </div>
                </div>
                <div className="flex mt-6">
                    ola
                </div>
            </div>
        </div>
    )
}
 
export default QueuePage