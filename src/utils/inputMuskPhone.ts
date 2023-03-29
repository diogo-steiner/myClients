import { regextOnlyNumber } from "./regexs";

export const handleMaskPhoneInput = (event: any) => {
  const input = event.target as HTMLInputElement;
  input.value = handleCreateMuskPhone(input.value);
};

export const handleCreateMuskPhone = (value: string) => {
  if (!value.trim()) return "";

  value = value.replace(regextOnlyNumber, "");
  value = value.replace(/(\d{2})(\d)/, "($1) $2");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  return value;
};
