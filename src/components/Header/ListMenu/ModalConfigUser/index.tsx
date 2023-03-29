import { yupResolver } from "@hookform/resolvers/yup";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "../../../../contexts/auth/hook";
import { api } from "../../../../services/api";
import { ButtonStyled } from "../../../../styles/Button";
import { FormErrorMessageStyled } from "../../../../styles/FormErrorMessage";
import { InputStyled } from "../../../../styles/Input";
import { LabelStyled } from "../../../../styles/Label";
import { LineSeparatorStyled } from "../../../../styles/LineSeparator/style";
import {
  handleCreateMuskPhone,
  handleMaskPhoneInput,
} from "../../../../utils/inputMuskPhone";
import { Modal } from "../../../Modal";
import { ModalBody } from "../../../Modal/ModalBody";
import { ModalHeader } from "../../../Modal/ModalHeader";
import { updateUserSchema } from "./schema";

interface IModalConfigUser {
  isOpenModal: boolean;
  handleCloseModal: () => void;
}

export interface IFormUpdateUser {
  firstName?: string;
  lastName?: string;
  email?: string;
  mobileNumber?: string;
  password?: string | null;
}

export const ModalConfigUser = ({
  isOpenModal,
  handleCloseModal,
}: IModalConfigUser) => {
  const { user, handleSetUser, handleLogout } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormUpdateUser>({
    resolver: yupResolver(updateUserSchema),
  });

  const numberFormatted = handleCreateMuskPhone(user?.mobileNumber!);

  const handleUpdateUser = async (dataUpdate: IFormUpdateUser) => {
    if (dataUpdate.password?.trim() == "") delete dataUpdate.password;

    try {
      const response = await api.patch("/users", dataUpdate);
      handleSetUser({ ...user, ...response.data });
      toast.success("Perfil atualizado com sucesso");
      handleCloseModal();
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

  const handleDeleteAccount = async () => {
    try {
      await api.delete(`/users`);
      handleLogout();
      toast.success("Conta deletada com sucesso");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal isOpen={isOpenModal} handleCloseModal={handleCloseModal}>
        <ModalHeader handleCloseModal={handleCloseModal}>
          <h2>Suas informações</h2>
          <ModalBody>
            <form onSubmit={handleSubmit(handleUpdateUser)}>
              <LabelStyled htmlFor="firstName">Primeiro nome</LabelStyled>
              <InputStyled
                id="firstName"
                type="text"
                defaultValue={user?.firstName}
                {...register("firstName")}
              />
              {errors.firstName && (
                <FormErrorMessageStyled>
                  {errors.firstName.message}
                </FormErrorMessageStyled>
              )}

              <LabelStyled htmlFor="lastName">Sorenome</LabelStyled>
              <InputStyled
                id="lastName"
                type="text"
                defaultValue={user?.lastName}
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
                defaultValue={user?.email}
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
                defaultValue={numberFormatted}
                {...register("mobileNumber")}
                maxLength={15}
                onKeyUp={handleMaskPhoneInput}
              />
              {errors.mobileNumber && (
                <FormErrorMessageStyled>
                  {errors.mobileNumber.message}
                </FormErrorMessageStyled>
              )}
              <LabelStyled htmlFor="newPassword">Nova senha</LabelStyled>
              <InputStyled
                id="newPassword"
                type="password"
                {...register("password")}
              />
              {errors.password && (
                <FormErrorMessageStyled>
                  {errors.password.message}
                </FormErrorMessageStyled>
              )}

              <ButtonStyled type="submit" mt={24}>
                Salvar alterações
              </ButtonStyled>
            </form>
            <LineSeparatorStyled />
            <ButtonStyled
              type="button"
              variant="outlineRed"
              onClick={handleDeleteAccount}
            >
              Excluir conta
            </ButtonStyled>
          </ModalBody>
        </ModalHeader>
      </Modal>
    </>
  );
};
