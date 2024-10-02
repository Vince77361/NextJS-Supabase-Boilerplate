import { create } from "zustand";

interface StoreType {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const RegisterModalStore = create<StoreType>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default RegisterModalStore;
