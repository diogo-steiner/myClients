import { useState } from "react";
import { Header } from "../../components/Header";
import { useAuth } from "../../contexts/auth/hook";
import { ButtonStyled } from "../../styles/Button";
import { ContainerStyled } from "../../styles/Container";
import { ListClients } from "./ListClients";
import { ModalAddClient } from "./ModalAddClient";
import { AddClient, Container } from "./styles";

export const ClientsPage = () => {
  const { user } = useAuth();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { clients } = user!;
  const handleOpenCloseModal = () => setIsOpenModal(!isOpenModal);

  return (
    <>
      <Header />
      <ModalAddClient
        isOpenModal={isOpenModal}
        handleOpenCloseModal={handleOpenCloseModal}
      />
      <Container>
        <ContainerStyled>
          <AddClient>
            <h2>Adcionar Cliente</h2>
            <ButtonStyled type="button" onClick={handleOpenCloseModal}>
              Adicionar
            </ButtonStyled>
          </AddClient>
          <ListClients clients={clients} />
        </ContainerStyled>
      </Container>
    </>
  );
};
