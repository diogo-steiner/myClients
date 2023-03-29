import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../../contexts/auth/hook";
import { ModalConfigUser } from "./ModalConfigUser";
import { ListMenuContainer } from "./styles";

export const ListMenu = () => {
  const { handleLogout } = useAuth();
  const [isOpenConfig, setIsOpenConfig] = useState(false);

  const handleOpenCloseModalConfig = () => {
    setIsOpenConfig(!isOpenConfig);
  };

  return (
    <>
      <ListMenuContainer>
        <button type="button" onClick={handleOpenCloseModalConfig}>
          {" "}
          <FiSettings /> Configurações
        </button>
        <button type="button" onClick={handleLogout}>
          <FiLogOut /> Sair
        </button>
      </ListMenuContainer>
      {isOpenConfig && (
        <ModalConfigUser
          isOpenModal={isOpenConfig}
          handleCloseModal={handleOpenCloseModalConfig}
        />
      )}
    </>
  );
};
