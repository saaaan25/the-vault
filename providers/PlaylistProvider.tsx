"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Playlist } from '@/types'

interface PlaylistContextType {
    playlists: Playlist[]
    setPlaylists: (playlists: Playlist[]) => void
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined)

export const PlaylistProvider = ({ children }: { children: ReactNode }) => {
    const [playlists, setPlaylists] = useState<Playlist[]>([])

    return (
        <PlaylistContext.Provider value={{ playlists, setPlaylists }}>
            {children}
        </PlaylistContext.Provider>
    );
};

export const usePlaylist = () => {
    const context = useContext(PlaylistContext);
    if (!context) {
        throw new Error('usePlaylist must be used within a PlaylistProvider')
    }
    return context
}