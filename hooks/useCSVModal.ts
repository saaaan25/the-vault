import { create } from "zustand";

interface CSVUploadStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useCSVUpload = create<CSVUploadStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useCSVUpload;