import { MouseEvent, ReactNode, useRef } from "react";
import { ModalContainer, Content } from "./styles";

interface IModalProps {
  children: ReactNode;
  isOpen: boolean;
  handleCloseModal: () => void;
}

export const Modal = ({ children, isOpen, handleCloseModal }: IModalProps) => {
  const modalContainerRef = useRef<HTMLHtmlElement>(null);

  if (!isOpen) {
    return null;
  }

  const handleClick = (e: MouseEvent) => {
    const elementclicked = e.target;
    const elementModel = modalContainerRef.current;

    if (elementclicked == elementModel) handleCloseModal();
  };

  return (
    <ModalContainer ref={modalContainerRef} onClick={(e) => handleClick(e)}>
      <Content>{children}</Content>
    </ModalContainer>
  );
};
