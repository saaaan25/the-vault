"use client"

import { useEffect, useState } from 'react';
import Header from "@/components/Header"
import useAuth from "@/hooks/useAuth"
import useUpload from "@/hooks/useUpload"
import { useUser } from "@/hooks/useUser"
import PageContent from './components/PageContent'
import { GoPlus } from 'react-icons/go';
import { Playlist } from '@/types';

interface Song {
    id: number;
    user_id: string;
    autor: string;
    title: string;
    song_path: string;
    image_path: string;
}

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const authModal = useAuth()
  const { user, accessToken, isLoading } = useUser()
  const uploadModal = useUpload()

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('/api/songs')
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json()
        setSongs(data);
      } catch (error) {
        console.error('Failed to fetch songs:', error);
      }
    }

    const fetchPlaylists = async () => {
      try {
        const response = await fetch('/api/playlist', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPlaylists(data);
      } catch (error) {
        console.error('Failed to fetch playlists:', error);
      }
    };

    fetchSongs();
    if (user && accessToken) {
      fetchPlaylists();
    }
  }, [user, accessToken])

  if (songs === undefined) {
    return <div>Cargando...</div>;
  }

  const onClick = () => {
    if (!user) {
      return authModal.onOpen()
    }

    return uploadModal.onOpen()
  }
  
  return (
    <div className="bg-custom-color-2 text-black h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <></>
      </Header>
      <div className="mb-2 ml-14 flex justify-between items-center">
        <h1 className="text-black text-2xl font-bold">Recientes</h1>
        <button
          className="bg-custom-color-6 cursor-pointer
                    hover:bg-custom-color-3
                    transition
                    border rounded-xl border-custom-color-3 h-fit w-fit p-3 mt-3 mr-5 flex items-center justify-center"
          onClick={onClick}
        >
          <GoPlus/>
        </button>
      </div>
      <div className="ml-14 mb-2">
      
        <PageContent songs={songs} playlists={playlists}/>
      </div>
  </div>
  );
}