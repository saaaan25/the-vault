"use client"
import React, { useState, useEffect } from 'react';
import ThemeModal from '@/components/ThemeModal';
import NameModal from "@/components/NameModal";
import ChangeImageModal from "@/components/ChangeImageModal";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";
import { FaPalette } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { useUser } from "@/hooks/useUser";
import { TbCrown, TbCrownOff } from "react-icons/tb";
import Image from 'next/image';

const ProfileSection: React.FC = () => {
  const { user, fullname, img: initialImg } = useUser();
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isChangeImageModalOpen, setIsChangeImageModalOpen] = useState(false);
  const [currentName, setCurrentName] = useState(fullname ?? "UsuarioNuevo");
  const [isHovered, setIsHovered] = useState(false);
  const [profileImg, setProfileImg] = useState(initialImg ?? "https://ozmrtqgdxaioihjqacow.supabase.co/storage/v1/object/public/images/userImage-default.jpg");
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const authModal = useAuth();

  const toggleHover = () => {
    setIsHovered(!isHovered);
  };

  const openThemeModal = () => {
    setIsThemeModalOpen(true);
  };

  const closeThemeModal = () => {
    setIsThemeModalOpen(false);
  };

  const openNameModal = () => {
    setIsNameModalOpen(true);
  };

  const closeNameModal = () => {
    setIsNameModalOpen(false);
  };

  const openChangeImageModal = () => {
    setIsChangeImageModalOpen(true);
  };

  const closeChangeImageModal = () => {
    setIsChangeImageModalOpen(false);
  };

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Sesión cerrada");
    }
    authModal.onOpen();
  };

  useEffect(() => {
    setCurrentName(fullname ?? "UsuarioNuevo");
  }, [fullname]);

  useEffect(() => {
    setProfileImg(initialImg ?? "https://ozmrtqgdxaioihjqacow.supabase.co/storage/v1/object/public/images/userImage-default.jpg");
  }, [initialImg]);

  const onUpdateImageUrl = (newUrl: string) => {
    const uniqueUrl = `${newUrl}?${new Date().getTime()}`;
    setProfileImg(uniqueUrl);
  };

  return (
    <div className="bg-custom-color-2 text-black h-full w-full overflow-hidden overflow-y-auto">
      <div style={{ display: 'flex', height: '100vh' }}>
        <div style={{
          flex: '1',
          backgroundColor: 'bg-custom-color-2',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div className="bg-custom-color-2 text-black h-full w-full overflow-hidden overflow-y-auto">
            <div className="mb-2 ml-14">
              <div className="flex justify-between items-center">
                <h1 className="text-black text-6xl font-bold">Perfil</h1>
              </div>
              <div style={{ display: 'grid', placeItems: 'center', height: '10vh' }}>
                <div className="relative" onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
                  <Image
                    src={profileImg}
                    alt="Foto de usuario"
                    className="rounded-full"
                    width={200}
                    height={200}
                  />
                  {isHovered && (
                    <div className="absolute inset-0 flex justify-center items-center">
                      <button style={{ fontSize: '24px' }} className="bg-cover bg-center bg-no-repeat" onClick={openChangeImageModal}>
                        <div style={{ fontSize: '20px' }} className="bg-black bg-opacity-50 text-white rounded-full p-14">
                          Cambiar foto de perfil
                        </div>
                      </button>
                    </div>
                  )}
                </div>
                <div className="p-2"></div>
                <div className="flex justify-between items-center gap-2">
                  <h3 className="text-black text-4xl">{currentName}</h3>
                  <button style={{ fontSize: '24px' }} onClick={openNameModal}>
                    <FaPencilAlt />
                  </button>
                </div>
                <div className="p-2"></div>
                <div className="p-2"></div>
                <button style={{ fontSize: '24px' }} className="bg-custom-color-6 pl-8 pr-8 pt-1 pb-1 rounded flex items-center gap-2" onClick={openThemeModal}>
                  <FaPalette />Personalizar tema
                </button>
                <div className="p-2"></div>
                {user ? (
                  <button style={{ fontSize: '24px' }} className="bg-custom-color-6 pl-16 pr-16 pt-1 pb-1 rounded flex items-center gap-2" onClick={handleLogout}>
                    <RiLogoutBoxLine /> Cerrar sesión
                  </button>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ThemeModal isOpen={isThemeModalOpen} onClose={closeThemeModal} />
      <NameModal isOpen={isNameModalOpen} onClose={closeNameModal} onNameChange={setCurrentName} />
      <ChangeImageModal isOpen={isChangeImageModalOpen} onClose={closeChangeImageModal} onUpdateImageUrl={onUpdateImageUrl} />
    </div>
  );
};

export default ProfileSection;
