import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

interface IAuthProvider {
  children: ReactNode;
}

export interface IClient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  createdAt: Date;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  clients: IClient[];
}

interface IAuthContext {
  user: null | IUser;
  handleSetUser: (user: IUser) => void;
  handleLogout: () => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<null | IUser>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("@myclients:token");

    const handleAutoLogin = async () => {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      try {
        const response = await api.get("/sessions");
        setUser(response.data);
        navigate("/clients", { replace: true });
      } catch (error) {
        console.error(error);
      }
    };

    if (token) handleAutoLogin();
  }, []);

  const handleSetUser = (user: IUser) => {
    setUser(user);
    return {};
  };

  const handleLogout = () => {
    localStorage.removeItem("@myclients:token");
    setUser(null);
    navigate("/", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, handleSetUser, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
