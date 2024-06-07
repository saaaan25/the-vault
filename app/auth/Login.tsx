"use client"

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import { FaKey } from "react-icons/fa"
import { HiUser } from "react-icons/hi"

const Login= () => {
    const supabaseClient = useSupabaseClient()
    const router = useRouter()
    const { session } = useSessionContext()

    return (
        <div className="
            bg-custom-color-2 
            flex items-center 
            justify-center 
            w-full 
            h-full
            ">
            <form className="
                border-custom-color-4 
                flex
                flex-col 
                border
                w-3/4 
                h-3/4
                ">
                <div className="
                    bg-custom-color 
                    flex 
                    w-full
                    h-[40px]
                    ">
                    <div></div>
                </div>
                <div className="
                    bg-custom-color-2 
                    flex
                    w-full
                    h-full
                    border-custom-color-4
                    border-t
                    flex-col
                    ">
                    <div className="
                        h-[30%]
                        bg-custom-color-2
                        flex
                        items-center
                        justify-center
                        ">
                        <div className="
                            text-custom-color-4
                            font-retropix
                            text-7xl
                            pt-10
                            fontWeight-900
                            "
                            style={{ letterSpacing: '0.1em', transform: 'scaleX(1)' }}>
                            THE VAULT_
                        </div>
                    </div>
                    <div className="
                        h-[35%]
                        bg-custom-color-2
                        flex
                        flex-col
                        items-center
                        justify-center
                        ">
                        <div className="
                            flex
                            mb-8
                            ">
                            <HiUser className="mr-6 text-custom-color-4" size={40}></HiUser>
                            <input className="
                                bg-custom-color-2 
                                border-b 
                                border-custom-color-4" 
                            size={35}></input>
                        </div>
                        <div className="flex">
                            <FaKey className="mr-6 text-custom-color-4" size={40}></FaKey>
                            <input className="
                            bg-custom-color-2 
                            border-b 
                            border-custom-color-4" 
                        size={35}></input>
                        </div>
                    </div>
                    <div className="
                        h-[35%]
                        bg-custom-color-2
                        flex
                        flex-col
                        items-center
                        justify-center
                        ">
                        <div className="
                            mb-3
                            text-sm
                            ">
                            <p>¿No tienes cuenta?
                                <button className="font-bold ml-2">Regístrate</button>
                            </p>
                        </div>
                        <div>
                            <button className="
                                bg-custom-color
                                pl-5
                                pr-5
                                pt-0.5
                                pb-0.5
                                rounded
                                text-xl
                                ">
                                Iniciar sesión
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
 
export default Login