import * as yup from "yup";
import { ILoginForm } from ".";

export const LoginSchema: yup.ObjectSchema<ILoginForm> = yup.object().shape({
  email: yup
    .string()
    .email("Digite um email válido")
    .trim()
    .required("Email obrigatório"),
  password: yup.string().trim().required("Senha obrigatória"),
});
