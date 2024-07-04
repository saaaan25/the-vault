"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Song } from '@/types';
import { Queue } from '@/structures/queue';

interface RecentSearchContextType {
    queue: Queue<Song>;
    addToRecent: (song: Song) => void;
    removeFromRecent: () => Song | undefined;
    clearRecent: () => void;
    isInRecent: (song: Song) => boolean;
}

const RecentSearchContext = createContext<RecentSearchContextType | undefined>(undefined);

export const RecentSearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [queue, setQueue] = useState(new Queue<Song>());

    useEffect(() => {
        const savedRecent = localStorage.getItem('playbackRecent');
        if (savedRecent) {
            const parsedRecent: Song[] = JSON.parse(savedRecent);
            const initialRecent = new Queue<Song>();
            parsedRecent.forEach(song => initialRecent.enqueue(song));
            setQueue(initialRecent);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('playbackRecent', JSON.stringify(queue.getItems()));
    }, [queue]);

    const addToRecent = (song: Song) => {
        const newRecent = new Queue<Song>();
        queue.getItems().forEach(item => newRecent.enqueue(item));
        newRecent.enqueue(song);
        setQueue(newRecent);
    };

    const removeFromRecent = (): Song | undefined => {
        const newRecent = new Queue<Song>();
        queue.getItems().forEach(item => newRecent.enqueue(item));
        const removedRecentSong = newRecent.dequeue();
        setQueue(newRecent);
        return removedRecentSong;
    };

    const clearRecent = () => {
        const newRecent = new Queue<Song>();
        setQueue(newRecent);
    };

    const isInRecent = (song: Song): boolean => {
        return queue.getItems().some(item => item.id === song.id);
    };

    return (
        <RecentSearchContext.Provider value={{ queue, addToRecent, removeFromRecent, clearRecent, isInRecent }}>
            {children}
        </RecentSearchContext.Provider>
    );
};

export const useRecentSearch = () => {
    const context = useContext(RecentSearchContext);
    if (context === undefined) {
        throw new Error('useQueue must be used within a QueueProvider');
    }
    return context;
};
