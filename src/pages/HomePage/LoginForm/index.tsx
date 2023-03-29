import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { api } from "../../../services/api";
import { ButtonStyled } from "../../../styles/Button";
import { InputStyled } from "../../../styles/Input";
import { LabelStyled } from "../../../styles/Label";
import { LoginSchema } from "./schema";
import { useAuth } from "../../../contexts/auth/hook";
import { IUser } from "../../../contexts/auth";
import { FormErrorMessageStyled } from "../../../styles/FormErrorMessage";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

export interface ILoginForm {
  email: string;
  password: string;
}

interface ILoginResponse {
  token: string;
  user: IUser;
}

export const LoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: yupResolver(LoginSchema),
  });
  const { handleSetUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (dataLogin: ILoginForm) => {
    try {
      const response = await api.post("/sessions", dataLogin);
      const responseData: ILoginResponse = response.data;

      const { token, user } = responseData;
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("@myclients:token", token);
      handleSetUser(user);
      navigate("/clients", { replace: true });
      toast.success("Login realizado com sucesso");
    } catch (error) {
      if (isAxiosError(error)) {
        const msgLoginValid = "Email or password invalid";
        const msgErrorAxios = error.response?.data.message;

        if (msgErrorAxios == msgLoginValid) {
          toast.error("Email ou senha inválidos");
        }
      }
      console.error(error);
    }

    return;
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <LabelStyled htmlFor="email">Email</LabelStyled>
      <InputStyled
        id="email"
        type="email"
        placeholder="Digite seu email"
        {...register("email")}
      />
      {errors.email && (
        <FormErrorMessageStyled>{errors.email.message}</FormErrorMessageStyled>
      )}

      <LabelStyled htmlFor="password">Senha</LabelStyled>
      <InputStyled
        id="password"
        type="password"
        placeholder="Digite sua senha"
        {...register("password")}
      />
      {errors.password && (
        <FormErrorMessageStyled>
          {errors.password.message}
        </FormErrorMessageStyled>
      )}

      <ButtonStyled type="submit" mt={24}>
        Entrar
      </ButtonStyled>
    </form>
  );
};
