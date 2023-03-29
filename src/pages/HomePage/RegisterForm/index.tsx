import { yupResolver } from "@hookform/resolvers/yup";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IUser } from "../../../contexts/auth";
import { useAuth } from "../../../contexts/auth/hook";
import { api } from "../../../services/api";
import { ButtonStyled } from "../../../styles/Button";
import { FormErrorMessageStyled } from "../../../styles/FormErrorMessage";
import { InputStyled } from "../../../styles/Input";
import { LabelStyled } from "../../../styles/Label";
import { handleMaskPhoneInput } from "../../../utils/inputMuskPhone";
import { registerSchema } from "./schema";

export interface IRegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  password: string;
}

interface IRegisterResponse {
  token: string;
  user: IUser;
}

export const RegisterForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IRegisterForm>({
    resolver: yupResolver(registerSchema),
  });
  const { handleSetUser } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (dataRegister: IRegisterForm) => {
    try {
      const response = await api.post("/users", dataRegister);
      const responseData: IRegisterResponse = response.data;

      const { token, user } = responseData;
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("@myclients:token", token);
      handleSetUser(user);
      navigate("/clients", { replace: true });
      toast.success("Cadastro realizado com sucesso");
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

    return;
  };

  return (
    <form onSubmit={handleSubmit(handleRegister)}>
      <LabelStyled htmlFor="firstName">Primeiro nome</LabelStyled>
      <InputStyled
        id="firstName"
        type="text"
        placeholder="Informe seu nome"
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
        placeholder="Informe seu sobrenome"
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
        placeholder="Informe seu email"
        {...register("email")}
      />
      {errors.email && (
        <FormErrorMessageStyled>{errors.email.message}</FormErrorMessageStyled>
      )}

      <LabelStyled htmlFor="mobileNumber">Número de celular</LabelStyled>
      <InputStyled
        id="mobileNumber"
        type="tel"
        placeholder="Informe um número celular"
        {...register("mobileNumber")}
        onKeyUp={handleMaskPhoneInput}
        maxLength={15}
      />
      {errors.mobileNumber && (
        <FormErrorMessageStyled>
          {errors.mobileNumber.message}
        </FormErrorMessageStyled>
      )}

      <LabelStyled htmlFor="password">Senha</LabelStyled>
      <InputStyled
        id="password"
        type="password"
        placeholder="Informe um senha"
        {...register("password")}
      />
      {errors.password && (
        <FormErrorMessageStyled>
          {errors.password.message}
        </FormErrorMessageStyled>
      )}

      <ButtonStyled type="submit" mt={24}>
        Criar conta
      </ButtonStyled>
    </form>
  );
};
