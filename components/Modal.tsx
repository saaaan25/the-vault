import * as Dialog from "@radix-ui/react-dialog"
import { IoMdClose } from "react-icons/io"
import "../app/globals.css"

interface ModalProps {
    isOpen: boolean
    onChange: (open: boolean) => void
    title: string
    description: string
    children: React.ReactNode
}

const Modal:React.FC<ModalProps> = ({
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
                bg-neutral-900/40
                fixed
                inset-0
                "/>
                <Dialog.Content
                className="
                fixed
                drop-shadow-md
                border
                border-custom-color-2
                top-[50%]
                left-[50%]
                max-h-full
                h-full
                md:h-auto
                md:max-h-[85vh]
                w-full
                md:w-[90vw]
                md:max-w-[450px]
                translate-x-[-50%]
                translate-y-[-50%]
                rounded-md
                bg-custom-color-2
                p-[25px]
                focus:outline-none
                ">
                    <div>
                        <Dialog.Title
                        className="
                        text-xl
                        font-bold
                        mb-4
                        ">
                            {title}
                        </Dialog.Title>
                        <Dialog.Description className="
                        mb-5
                        text-sm
                        leading-normal
                        ">
                            {description}
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
                        <div className="
                        flex
                        justify-center
                        ">
                            <button className="
                            bg-custom-color
                            pl-5
                            pr-5
                            rounded-[5px]
                            ">
                                Aceptar
                            </button>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
 
export default Modal