import { cn } from "@/utils/utils";
import React, {
  createContext,
  useContext,
  useRef,
  ReactNode,
  FC,
  forwardRef,
  ForwardedRef,
} from "react";
import { IoIosClose } from "react-icons/io";

interface IModalContext {
  openModal: () => void;
  closeModal: () => void;
}

const modalContext = createContext<IModalContext | undefined>(undefined);

interface ModalContainerProps {
  children: ReactNode;
}

const ModalContainer = ({ children }: ModalContainerProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
  };

  const contextValue: IModalContext = { openModal, closeModal };

  return (
    <modalContext.Provider value={contextValue}>
      <ModalTrigger>Open</ModalTrigger>
      <dialog
        id="modal"
        open={true}
        className="modal p-4 max-w-md w-full rounded bg-white"
        ref={dialogRef}
      >
        {children}
      </dialog>
    </modalContext.Provider>
  );
};

const useModal = () => {
  const context = useContext(modalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  forwardedRef?: ForwardedRef<HTMLDivElement>;
  children?: ReactNode;
}

const ModalHeader: FC<ModalHeaderProps> = forwardRef<
  HTMLDivElement,
  ModalHeaderProps
>(({ children, className, ...rest }, ref) => {
  const { closeModal } = useModal();
  return (
    <div ref={ref} className={cn("flex justify-between", className)} {...rest}>
      <span>{children}</span>
      <button onClick={closeModal}>
        <IoIosClose size={26} />
      </button>
    </div>
  );
});

ModalHeader.displayName = "ModalHeader";

interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  forwardedRef?: ForwardedRef<HTMLDivElement>;
  children?: ReactNode;
}

const ModalFooter: FC<ModalFooterProps> = forwardRef<
  HTMLDivElement,
  ModalFooterProps
>(({ children, className, ...rest }, ref) => {
  return (
    <div ref={ref} className={cn("", className)} {...rest}>
      {children}
    </div>
  );
});

ModalFooter.displayName = "ModalFooter";

interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
  forwardedRef?: ForwardedRef<HTMLDivElement>;
  children?: ReactNode;
}

const ModalContent: FC<ModalContentProps> = forwardRef<
  HTMLDivElement,
  ModalContentProps
>(({ children, className, ...rest }, ref) => {
  return (
    <div ref={ref} className={cn("", className)} {...rest}>
      {children}
    </div>
  );
});

ModalContent.displayName = "ModalContent";

interface ModalTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  forwardedRef?: ForwardedRef<HTMLButtonElement>;
  children?: ReactNode;
}

const ModalTrigger: FC<ModalTriggerProps> = forwardRef<
  HTMLButtonElement,
  ModalTriggerProps
>(({ children, className, ...rest }, ref) => {
  const { openModal } = useModal();
  return (
    <button
      ref={ref}
      className={cn("border px-4 py-1 rounded cursor-pointer", className)}
      onClick={openModal}
      {...rest}
    >
      {children}
    </button>
  );
});

ModalTrigger.displayName = "ModalTrigger";

ModalContainer.Header = ModalHeader;
ModalContainer.Footer = ModalFooter;
ModalContainer.Content = ModalContent;
ModalContainer.Trigger = ModalTrigger;

export { ModalContainer, useModal };
