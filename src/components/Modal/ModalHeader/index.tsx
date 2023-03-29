import { ReactNode } from "react";
import { CgClose } from "react-icons/cg";
import { ButtonCloseModal, ModalHeaderContainer } from "./styles";

interface IModalHeaderProps {
  children: ReactNode;
  handleCloseModal: () => void;
}

export const ModalHeader = ({
  children,
  handleCloseModal,
}: IModalHeaderProps) => {
  return (
    <ModalHeaderContainer>
      {children}
      <ButtonCloseModal onClick={handleCloseModal}>
        <CgClose />
      </ButtonCloseModal>
    </ModalHeaderContainer>
  );
};
