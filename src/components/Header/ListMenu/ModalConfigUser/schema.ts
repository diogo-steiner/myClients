import * as yup from "yup";
import { IFormUpdateUser } from ".";
import { regextOnlyNumber } from "../../../../utils/regexs";

export const updateUserSchema: yup.ObjectSchema<IFormUpdateUser> = yup
  .object()
  .shape({
    firstName: yup
      .string()
      .min(3, "Seu nome deve ter no mínimo 3 letras")
      .max(12, "Seu nome deve ter no máximo 12 letras")
      .trim(),
    lastName: yup
      .string()
      .min(3, "Seu sobrenome deve ter no mínimo 3 letras")
      .max(12, "Seu sobrenome deve ter no máximo 12 letras")
      .trim(),
    email: yup
      .string()
      .email("Informe um email válido")
      .min(6, "Seu email deve ter no mínimo 6 caracteres")
      .max(72, "Seu email deve ter no máximo 72 caracteres")
      .trim(),
    mobileNumber: yup
      .string()
      .length(11, "Seu novo número de ceular deve ter 11 números")
      .trim()
      .transform((value: string) => value.replace(regextOnlyNumber, "")),
    password: yup.string().test({
      test(value, ctx) {
        value = value!.trim();

        if (value == "") return true;

        if (value.length < 6) {
          return ctx.createError({
            message: "Sua nova senha deve ter no mínimo 6 caracteres",
          });
        } else if (value.length > 72) {
          return ctx.createError({
            message: "Sua nova senha deve ter no máximo 72 caracteres",
          });
        }

        return true;
      },
    }),
  });
