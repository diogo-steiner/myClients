import { ReactNode } from "react";
import { ModalBodyContainer } from "./styles";

interface IModalBodyProps {
  children: ReactNode;
}

export const ModalBody = ({ children }: IModalBodyProps) => {
  return <ModalBodyContainer>{children}</ModalBodyContainer>;
};
