"use client"

import { usePathname } from "next/navigation"
import { useMemo, useState } from "react"
import { BiLibrary, BiSearch } from "react-icons/bi"
import { HiHome, HiUser } from "react-icons/hi"
import Box from "./Box"
import SidebarItem from "./SidebarItem"


interface SidebarProps {
    children: React.ReactNode
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
    const pathname = usePathname()
    const [active, setActive] = useState(pathname)

    const routes = useMemo(() => [
        {
            icon: HiHome,
            label: 'Home',
            active: active === '/home',
            href: '/home',
        },
        {
            icon: BiSearch,
            label: 'Search',
            active: active === '/search',
            href: '/search',
        },
        {
            icon: BiLibrary,
            label: 'Library',   
            active: active === '/library',
            href: '/library',
        },
        { 
            icon: HiUser,
            label: 'User',
            active: active === '/user',
            href: '/user',
        }
    ], [active])

    const handleClick = (href: string) => {
        setActive(href)
    }

    return ( 
        <div className="flex h-full">
            <div className="
                hidden 
                md:flex 
                flex-col 
                gap-y-2 
                bg-custom-color 
                h-full 
                w-[100px] 
                p-2
                ">
                {routes.map((item) => (
                    <Box key={item.label}>
                        <div 
                            className={`
                                relative flex 
                                justify-center 
                                my-2 
                                transition-transform 
                                duration-300 
                                ${item.active ? 'transform translate-x-10' : ''}`}
                            onClick={() => handleClick(item.href)}
                        >
                            <div 
                                className={`
                                bg-custom-color 
                                flex 
                                flex-col 
                                gap-y-4 
                                px-5 
                                py-4 
                                rounded-full 
                                ${item.active ? 'shadow-xl border-custom-color border-2 bg-custom-color-2' : ''}`}
                            >
                                <SidebarItem key={item.label} {...item}/>
                            </div>
                        </div>
                    </Box>
                ))}
            </div>
            <main className="w-full">
                {children}
            </main>
        </div>
    )
}

export default Sidebar