import { FaTimes, FaWindowMaximize, FaWindowMinimize } from "react-icons/fa"

const Login = () => {
    return (
        <div className="
            bg-custom-color-2 
            flex items-center 
            justify-center 
            w-full 
            h-full
            ">
            <div className="
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
                            pt-6
                            fontWeight-900
                            "
                            style={{ letterSpacing: '0.1em', transform: 'scaleX(1)' }}>
                            THE VAULT_
                        </div>
                    </div>
                    <div className="
                        h-[40%]
                        bg-green-500
                        ">
                        ola 2
                    </div>
                    <div className="
                        h-[30%]
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
                                <a className="font-bold"> Regístrate</a>
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
            </div>
        </div>
    )
}
 
export default Login