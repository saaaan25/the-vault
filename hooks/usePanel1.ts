import { create } from "zustand"

interface Panel1Store {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

const usePanel1 = create<Panel1Store>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false}),
}))

export default usePanel1
