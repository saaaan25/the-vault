"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { IoMdClose } from "react-icons/io"

interface AuthModalProps {
    isOpen: boolean
    onChange: (open: boolean) => void
    title: string
    description: string
    children: React.ReactNode
}

const AuthModal:React.FC<AuthModalProps> = ({
    isOpen,
    onChange,
    title,
    description,
    children
}) => {
    return (
        <Dialog.Root
            open={isOpen}
            defaultOpen={isOpen}
            onOpenChange={onChange}>
            <Dialog.Portal>
                <Dialog.Overlay
                className="
                bg-custom-color-2
                fixed
                inset-0
                "/>
                <Dialog.Content
                className="
                fixed
                drop-shadow-md
                border
                border-custom-color-4
                top-[50%]
                left-[50%]
                max-h-full
                h-[75%]
                w-[75%]
                md:h-[75%]
                md:w-[75%]
                translate-x-[-50%]
                translate-y-[-50%]
                bg-custom-color-2
                
                focus:outline-none
                "> 
                    <div className="
                        bg-custom-color 
                        flex
                        w-full
                        h-[10%]
                        border-custom-color-4
                        border-b
                        flex-col
                        ">
                    </div>

                    <div className="h-full w-full pl-[50px] pr-[50px] flex flex-col">    
                        <Dialog.Title
                        className="
                        text-6xl
                        font-bold
                        mt-5
                        h-[30%]
                        text-custom-color-4
                        font-retropix
                        fontWeight-900
                        flex
                        items-end
                        justify-center
                        "
                        style={{ letterSpacing: '0.1em', transform: 'scaleX(1)' }}>
                            {title}
                        </Dialog.Title>
                        <Dialog.Description className="
                        
                        text-sm
                        leading-normal
                        h-[30%]
                        bg-white
                        ">
                            
                        </Dialog.Description>
                        <div className="mb-4">
                            {children}
                        </div>
                        <Dialog.Close asChild>
                            <button className="
                            text-black
                            hover:text-neutral-500
                            absolute
                            top-[10px]
                            right-[10px]
                            inline-flex
                            h-[25px]
                            w-[25px]
                            appearance-none
                            items-center
                            rounded-full
                            focus:outline-none
                            ">
                                <IoMdClose/>
                            </button>
                        </Dialog.Close>
                        
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
 
export default AuthModal