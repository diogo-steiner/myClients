import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { Modal } from "../../../components/Modal";
import { ModalBody } from "../../../components/Modal/ModalBody";
import { ModalHeader } from "../../../components/Modal/ModalHeader";
import { useAuth } from "../../../contexts/auth/hook";
import { api } from "../../../services/api";
import { ButtonStyled } from "../../../styles/Button";
import { InputStyled } from "../../../styles/Input";
import { LabelStyled } from "../../../styles/Label";
import { addClientSchema } from "./schema";
import { handleMaskPhoneInput } from "../../../utils/inputMuskPhone";
import { FormErrorMessageStyled } from "../../../styles/FormErrorMessage";

interface IModalAddClientProps {
  isOpenModal: boolean;
  handleOpenCloseModal: () => void;
}

export interface IFormAddClient {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
}

export const ModalAddClient = ({
  isOpenModal,
  handleOpenCloseModal,
}: IModalAddClientProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<IFormAddClient>({
    resolver: yupResolver(addClientSchema),
  });
  const { user, handleSetUser } = useAuth();

  const handleAddClient = async (dataClient: IFormAddClient) => {
    try {
      const response = await api.post("/clients", dataClient);
      const allClients = [...user?.clients!, response.data];
      handleSetUser({ ...user!, clients: allClients });

      reset();
      handleOpenCloseModal();
      toast.success("Cliente cadastrado com sucesso");
    } catch (error) {
      if (isAxiosError(error)) {
        const msgEmailRegistered = "Email already registered";
        const msgNumberRegistered = "Mobile number already registered";

        const msgErrorAxios = error.response?.data.message;
        if (msgErrorAxios == msgEmailRegistered) {
          toast.error("Email já cadastrado");
        } else if (msgErrorAxios == msgNumberRegistered) {
          toast.error("Número de celular já cadastrado");
        }
      }

      console.error(error);
    }
  };

  return (
    <Modal isOpen={isOpenModal} handleCloseModal={handleOpenCloseModal}>
      <ModalHeader handleCloseModal={handleOpenCloseModal}>
        <h2>Adicionar cliente</h2>
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(handleAddClient)}>
          <LabelStyled htmlFor="firstName">Primeiro nome</LabelStyled>
          <InputStyled
            id="firstName"
            type="text"
            placeholder="Nome do cliente"
            {...register("firstName")}
          />
          {errors.firstName && (
            <FormErrorMessageStyled>
              {errors.firstName.message}
            </FormErrorMessageStyled>
          )}

          <LabelStyled htmlFor="lastName">Sobrenome</LabelStyled>
          <InputStyled
            id="lastName"
            type="text"
            placeholder="Sobrenome do cliente"
            {...register("lastName")}
          />
          {errors.lastName && (
            <FormErrorMessageStyled>
              {errors.lastName.message}
            </FormErrorMessageStyled>
          )}

          <LabelStyled htmlFor="email">Email</LabelStyled>
          <InputStyled
            id="email"
            type="emai"
            placeholder="Email do cliente"
            {...register("email")}
          />
          {errors.email && (
            <FormErrorMessageStyled>
              {errors.email.message}
            </FormErrorMessageStyled>
          )}

          <LabelStyled htmlFor="mobileNumber">Celular</LabelStyled>
          <InputStyled
            id="mobileNumber"
            type="tel"
            placeholder="Celuar do cliente"
            {...register("mobileNumber")}
            onKeyUp={handleMaskPhoneInput}
            maxLength={15}
          />
          {errors.email && (
            <FormErrorMessageStyled>
              {errors.mobileNumber?.message}
            </FormErrorMessageStyled>
          )}

          <ButtonStyled type="submit" mt={24}>
            Adicionar agora
          </ButtonStyled>
        </form>
      </ModalBody>
    </Modal>
  );
};
