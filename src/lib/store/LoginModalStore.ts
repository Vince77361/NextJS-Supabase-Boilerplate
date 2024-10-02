import { create } from "zustand";

interface StoreType {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const LoginModalStore = create<StoreType>((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default LoginModalStore;
