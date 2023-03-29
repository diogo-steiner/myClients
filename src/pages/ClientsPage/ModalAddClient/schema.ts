import * as yup from "yup";
import { IFormAddClient } from ".";
import { regextOnlyNumber } from "../../../utils/regexs";

export const addClientSchema: yup.ObjectSchema<IFormAddClient> = yup
  .object()
  .shape({
    firstName: yup
      .string()
      .min(3, "O nome deve ter no mínimo 3 letras")
      .max(12, "O nome deve ter no máximo 12 letras")
      .trim()
      .required("Informe o nome do cliente"),
    lastName: yup
      .string()
      .min(3, "O sobrenome deve ter no mínimo 3 letras")
      .max(12, "O sobrenome deve ter no máximo 12 letras")
      .trim()
      .required("Informe o sobrenome do cliente"),
    email: yup
      .string()
      .email("Informe um email válido")
      .trim()
      .required("Informe o email do cliente"),
    mobileNumber: yup
      .string()
      .length(11, "Deve conter 11 números")
      .trim()
      .required("Informe o número de celular do cliente")
      .transform((value: string) => value.replace(regextOnlyNumber, "")),
  });
