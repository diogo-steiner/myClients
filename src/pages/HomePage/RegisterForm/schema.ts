import * as yup from "yup";
import { IRegisterForm } from ".";
import { regextOnlyNumber } from "../../../utils/regexs";

export const registerSchema: yup.ObjectSchema<IRegisterForm> = yup
  .object()
  .shape({
    firstName: yup
      .string()
      .min(3, "Seu nome deve ter no mínimo 3 letras")
      .max(12, "Seu nome deve ter no máximo 12 letras")
      .trim()
      .required("Nome obrigatório"),
    lastName: yup
      .string()
      .min(3, "Seu sobrenome deve ter no mínimo 3 letras")
      .max(12, "Seu sobrenome deve ter no máximo 12 letras")
      .trim()
      .required("Sobrenome obrigatório"),
    email: yup
      .string()
      .email("Informe um email válido")
      .trim()
      .required("Email obrigatório"),
    mobileNumber: yup
      .string()
      .length(11, "Deve conter 11 números")
      .trim()
      .required("Número de celular obrigatório")
      .transform((value: string) => value.replace(regextOnlyNumber, "")),
    password: yup
      .string()
      .min(6, "Sua senha deve ter no mínimo 6 caracteres")
      .max(72, "Sua senha deve ter no máximo 72 caracteres")
      .trim()
      .required("Senha obrigatória"),
  });
