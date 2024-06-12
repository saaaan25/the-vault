"use client"

import { useEffect, useState } from "react"
import AuthModal from "./AuthModal"
import { useSession, useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import '../app/globals.css'
import useAuth from "@/hooks/useAuth"

const LoginModal = () => {
    const supabaseClient = useSupabaseClient()
    const router = useRouter()
    const { session } = useSessionContext()
    const { onClose, isOpen, onOpen } = useAuth()

    useEffect(() => {
        if (session) {
            router.refresh()
            onClose()
        }
    }, [session, router, onClose])

    const onChange = (open: boolean) => {
        if (!open) {
            onClose()
        }

    }

    return (
        <>
            <AuthModal 
                title="THE VAULT_" 
                description="Iniciar Sesión" 
                isOpen={isOpen}
                onChange={() => {}}>
                    <div className="max-w-xs h-96 mx-auto">
                        <Auth
                        providers={[]}
                        supabaseClient={supabaseClient}
                        appearance={{
                            theme: ThemeSupa,
                            variables: {
                                default: {
                                    colors: {
                                        brand: '#F0B2B7',
                                        brandAccent: '#F3E6DE', 
                                    }
                                }
                            }
                        }}
                        />
                    </div>
                    
            </AuthModal>
        </>
    )
}
 
export default LoginModal