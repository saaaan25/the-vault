import Link from "next/link"
import { IconType } from "react-icons"
import { twMerge } from "tailwind-merge"

interface SidebarItemProps {
    icon: IconType
    label: string
    active: boolean
    href: string
}

const SidebarItem:React.FC<SidebarItemProps> = ({icon: Icon, label, active, href}) => {
    return (
        <Link href={href} className={twMerge(`
        flex 
        flex-row 
        h-auto 
        items-center 
        justify-center 
        w-auto 
        gap-x-4 
        text-md 
        cursor-pointer 
        hover:text-white 
        transition 
        text-custom-color-2 
        py-1`, 
        active && "text-custom-color")}>
            <Icon size={40}/>
        </Link>
    )
}
 
export default SidebarItem