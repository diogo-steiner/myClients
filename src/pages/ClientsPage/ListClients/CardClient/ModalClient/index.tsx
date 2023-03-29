import { yupResolver } from "@hookform/resolvers/yup";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Modal } from "../../../../../components/Modal";
import { ModalBody } from "../../../../../components/Modal/ModalBody";
import { ModalHeader } from "../../../../../components/Modal/ModalHeader";
import { IClient } from "../../../../../contexts/auth";
import { useAuth } from "../../../../../contexts/auth/hook";
import { api } from "../../../../../services/api";
import { ButtonStyled } from "../../../../../styles/Button";
import { FormErrorMessageStyled } from "../../../../../styles/FormErrorMessage";
import { InputStyled } from "../../../../../styles/Input";
import { LabelStyled } from "../../../../../styles/Label";
import {
  handleCreateMuskPhone,
  handleMaskPhoneInput,
} from "../../../../../utils/inputMuskPhone";

import { clientUpdateSchema } from "./schema";

interface IModalClient {
  isOpen: boolean;
  handleCloseModal: () => void;
  client: IClient;
}

export interface IFormClientUpdate {
  firstName?: string;
  lastName?: string;
  email?: string;
  mobileNumber?: string;
}

export const ModalClient = ({
  isOpen,
  handleCloseModal,
  client,
}: IModalClient) => {
  const { user, handleSetUser } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormClientUpdate>({
    resolver: yupResolver(clientUpdateSchema),
  });

  const numberFormatted = handleCreateMuskPhone(client.mobileNumber);

  const handleClientUpdate = async (dataUpdate: IFormClientUpdate) => {
    try {
      const response = await api.patch(`/clients/${client.id}`, dataUpdate);
      const clientsWithClientUpdated = user?.clients.map((clt) => {
        if (clt.id == client.id) {
          return response.data;
        }
        return clt;
      });

      handleSetUser({ ...user!, clients: clientsWithClientUpdated! });
      handleCloseModal();
      toast.success("Cliente atualizado com sucecsso");
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

  const handleDeleteClient = async () => {
    try {
      await api.delete(`/clients/${client.id}`);
      const clientsWithoutClientDeleted = user?.clients.filter(
        (clt) => clt.id != client.id
      );

      handleSetUser({ ...user!, clients: clientsWithoutClientDeleted! });
    } catch (error) {
      console.error(error);
    }
    return;
  };

  return (
    <Modal isOpen={isOpen} handleCloseModal={handleCloseModal}>
      <ModalHeader handleCloseModal={handleCloseModal}>
        <h2>Informações do cliente</h2>
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(handleClientUpdate)}>
          <LabelStyled htmlFor="firstName">Primeiro nome</LabelStyled>
          <InputStyled
            id="firstName"
            type="text"
            defaultValue={client.firstName}
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
            defaultValue={client.lastName}
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
            type="email"
            defaultValue={client.email}
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
            maxLength={15}
            defaultValue={numberFormatted}
            {...register("mobileNumber")}
            onKeyUp={handleMaskPhoneInput}
          />

          <ButtonStyled type="submit" my={24}>
            Salvar alterações
          </ButtonStyled>
        </form>

        <ButtonStyled
          type="button"
          variant="outlineRed"
          onClick={handleDeleteClient}
        >
          Excluir clinte
        </ButtonStyled>
      </ModalBody>
    </Modal>
  );
};
