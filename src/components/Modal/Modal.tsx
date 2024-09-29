import * as Dialog from "@radix-ui/react-dialog";
import { FC, ReactNode } from "react";

interface Props {
  title: string;
  isOpen: boolean;
  onChange: (open: boolean) => void;
  children: ReactNode;
}

const Modal: FC<Props> = ({ title, isOpen, onChange, children }) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="bg-neutral-900/90
                backdrop-blur-sm
                fixed
                inset-0"
        />
        <Dialog.Content className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[420px] h-fit rounded-md bg-neutral-800 p-6 drop-shadow-md border border-neutral-500">
          <Dialog.Title className="text-xl text-center text-white font-bold mb-4">
            {title}
          </Dialog.Title>
          <div>{children}</div>
          <Dialog.Close asChild>
            <button className="p-2 text-neutral-400 absolute top-3 right-3">
              X
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
