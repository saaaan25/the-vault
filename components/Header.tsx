"use client"

import { useRouter } from "next/navigation"
import { BiLibrary, BiSearch } from "react-icons/bi"
import { HiHome, HiUser } from "react-icons/hi"
import { RxCaretLeft, RxCaretRight } from "react-icons/rx"
import { twMerge } from "tailwind-merge"
import Button from "./Button"
import useAuth from "@/hooks/useAuth"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useUser } from "@/hooks/useUser"
import toast from "react-hot-toast"

interface HeaderProps {
    children: React.ReactNode
    className?: string 
  }  

const Header: React.FC<HeaderProps> = ( {children, className}) => {
    const router = useRouter()
    const authModal = useAuth()
    
    const supabaseClient = useSupabaseClient()
    const { user } = useUser()

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut()
        //reset any playing songs
        router.refresh()

        if (error) {
            toast.error(error.message)
        } else {
            toast.success("Sesión cerrada")
        }
    }
    
    return ( 
        <div className={twMerge(`
        h-fit
        p-6
        ml-8
        `, className)}>
            <div className="
            w-full
            flex
            items
            items-center
            justify-between
            ">
                <div className="
                hidden
                md:flex
                gap-x-2
                items-center
                ">
                    <button onClick={() => router.back()}
                    className="
                    rounded-full
                    bg-custom-color-3
                    flex
                    items-center
                    justify-center
                    hover:opacity-80
                    transition
                    ">
                        <RxCaretLeft className="text-custom-color-2" size={35}></RxCaretLeft>
                    </button>
                    <button onClick={() => router.forward()}
                    className="
                    rounded-full
                    bg-custom-color-3
                    flex
                    items-center
                    justify-center
                    hover:opacity-80
                    transition
                    ">
                        <RxCaretRight className="text-custom-color-2" size={35}></RxCaretRight>
                    </button>
                </div>
                <div className="flex md:hidden gap-x-2.5">
                    <button className="
                    rounded-full
                    p-2
                    bg-custom-color-3
                    flex
                    items-center
                    justify-center
                    hover:opacity-80
                    transition
                    ">
                        <HiHome className="text-custom-color-2" size={30}/>
                    </button>
                    <button className="
                    rounded-full
                    p-2
                    bg-custom-color-3
                    flex
                    items-center
                    justify-center
                    hover:opacity-80
                    transition
                    ">
                        <BiSearch className="text-custom-color-2" size={30}/>
                    </button>
                    <button className="
                    rounded-full
                    p-2
                    bg-custom-color-3
                    flex
                    items-center
                    justify-center
                    hover:opacity-80
                    transition
                    ">
                        <BiLibrary className="text-custom-color-2" size={30}/>
                    </button>
                    <button className="
                    rounded-full
                    p-2
                    bg-custom-color-3
                    flex
                    items-center
                    justify-center
                    hover:opacity-80
                    transition
                    ">
                        <HiUser className="text-custom-color-2" size={30}/>
                    </button>
                </div>
                {user ? (
                    <button className="
                        bg-custom-color
                        pl-5
                        pr-5
                        pt-0.5
                        pb-0.5
                        rounded
                        "
                            onClick={handleLogout}>
                        Cerrar Sesión
                    </button>
                ) : (
                <div>
                    <button className="
                        bg-custom-color
                        pl-5
                        pr-5
                        pt-0.5
                        pb-0.5
                        rounded
                        "
                            onClick={authModal.onOpen}>
                        Iniciar Sesión
                    </button>
                </div>)}
            </div>
            {children}
        </div>
    )
}
 
export default Header