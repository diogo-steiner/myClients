import { useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { useAuth } from "../../contexts/auth/hook";
import { ContainerStyled } from "../../styles/Container";
import { ListMenu } from "./ListMenu";
import { HeaderContainer } from "./styles";

export const Header = () => {
  const { user } = useAuth();
  const [isListMenuOpen, setIsListMenuOpen] = useState(false);

  return (
    <HeaderContainer>
      <ContainerStyled className="container">
        <h2></h2>

        {user && (
          <div className="menu__container">
            <strong>
              {user?.firstName} {user?.lastName}
            </strong>
            <button
              type="button"
              onClick={() => setIsListMenuOpen(!isListMenuOpen)}
            >
              <MdExpandMore />
            </button>
            {isListMenuOpen && <ListMenu />}
          </div>
        )}
      </ContainerStyled>
    </HeaderContainer>
  );
};
