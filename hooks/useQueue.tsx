"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Song } from '@/types';
import { Queue } from '@/structures/queue';

interface QueueContextType {
    queue: Queue<Song>;
    addToQueue: (song: Song) => void;
    removeFromQueue: () => Song | undefined;
    clearQueue: () => void;
    isInQueue: (song: Song) => boolean;
}

const QueueContext = createContext<QueueContextType | undefined>(undefined);

export const QueueProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [queue, setQueue] = useState(new Queue<Song>());

    useEffect(() => {
        const savedQueue = localStorage.getItem('playbackQueue');
        if (savedQueue) {
            const parsedQueue: Song[] = JSON.parse(savedQueue);
            const initialQueue = new Queue<Song>();
            parsedQueue.forEach(song => initialQueue.enqueue(song));
            setQueue(initialQueue);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('playbackQueue', JSON.stringify(queue.getItems()));
    }, [queue]);

    const addToQueue = (song: Song) => {
        const newQueue = new Queue<Song>();
        queue.getItems().forEach(item => newQueue.enqueue(item));
        newQueue.enqueue(song);
        setQueue(newQueue);
    };

    const removeFromQueue = (): Song | undefined => {
        const newQueue = new Queue<Song>();
        queue.getItems().forEach(item => newQueue.enqueue(item));
        const removedSong = newQueue.dequeue();
        setQueue(newQueue);
        return removedSong;
    };

    const clearQueue = () => {
        const newQueue = new Queue<Song>();
        setQueue(newQueue);
    };

    const isInQueue = (song: Song): boolean => {
        return queue.getItems().some(item => item.id === song.id);
    };

    return (
        <QueueContext.Provider value={{ queue, addToQueue, removeFromQueue, clearQueue, isInQueue }}>
            {children}
        </QueueContext.Provider>
    );
};

export const useQueue = () => {
    const context = useContext(QueueContext);
    if (context === undefined) {
        throw new Error('useQueue must be used within a QueueProvider');
    }
    return context;
};
