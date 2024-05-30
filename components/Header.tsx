"use client"

import { useRouter } from "next/navigation"
import { BiLibrary, BiSearch } from "react-icons/bi"
import { HiHome, HiUser } from "react-icons/hi"
import { RxCaretLeft, RxCaretRight } from "react-icons/rx"
import { twMerge } from "tailwind-merge"
import Button from "./Button"

interface HeaderProps {
    children: React.ReactNode
    className?: string 
  }  

const Header: React.FC<HeaderProps> = ( {children, className}) => {
    const router = useRouter()
    
    const handleLogout = () => {
        //ola
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
            </div>
            {children}
        </div>
    )
}
 
export default Header