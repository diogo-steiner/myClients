import { useContext } from "react";
import { AuthContext } from ".";

export const useAuth = () => {
  const contex = useContext(AuthContext);
  return contex;
};
