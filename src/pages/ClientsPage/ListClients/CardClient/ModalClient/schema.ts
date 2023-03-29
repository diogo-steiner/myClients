import * as yup from "yup";
import { IFormClientUpdate } from ".";
import { regextOnlyNumber } from "../../../../../utils/regexs";

export const clientUpdateSchema: yup.ObjectSchema<IFormClientUpdate> = yup
  .object()
  .shape({
    firstName: yup
      .string()
      .min(3, "O nome do cliente deve ter no mínimo 3 letras")
      .max(12, "O nome do cliente deve ter no máximo 12 letras")
      .trim(),
    lastName: yup
      .string()
      .min(3, "O sobrenome do cliente deve ter no mínimo 3 letras")
      .max(12, "O sobrenome do cliente deve ter no máximo 12 letras")
      .trim(),
    email: yup.string().email("Informe um email válido").trim(),
    mobileNumber: yup
      .string()
      .length(11, "Deve conter 11 números")
      .trim()
      .transform((value: string) => value.replace(regextOnlyNumber, "")),
  });
