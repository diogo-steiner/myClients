import { useState } from "react";
import { Header } from "../../components/Header";
import { Modal } from "../../components/Modal";
import { ModalBody } from "../../components/Modal/ModalBody";
import { ModalHeader } from "../../components/Modal/ModalHeader";
import { ButtonStyled } from "../../styles/Button";
import { LineSeparatorStyled } from "../../styles/LineSeparator/style";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { Container, CallToAction } from "./styles";

export const HomePage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenCloseModal = () => setIsOpenModal(!isOpenModal);

  return (
    <>
      <Header />
      <Container>
        <CallToAction>
          <h2>
            Tenha <strong>controle</strong> de todos os seus{" "}
            <strong>clientes</strong> de forma rápida e fácil
          </h2>
          <ButtonStyled type="button" onClick={handleOpenCloseModal}>
            Quero ter controle
          </ButtonStyled>
        </CallToAction>

        <Modal isOpen={isOpenModal} handleCloseModal={handleOpenCloseModal}>
          <ModalHeader handleCloseModal={handleOpenCloseModal}>
            <h2>{isLogin ? "Login" : "Cadastro"}</h2>
          </ModalHeader>
          <ModalBody>
            {isLogin ? <LoginForm /> : <RegisterForm />}
            <LineSeparatorStyled />
            <ButtonStyled
              type="button"
              variant="outlineGreen"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Criar Conta" : "Voltar para o login"}
            </ButtonStyled>
          </ModalBody>
        </Modal>
      </Container>
    </>
  );
};
