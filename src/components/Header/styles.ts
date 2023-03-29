import styled from "styled-components";
import logoMobile from "./../../assets/logo-mobile.svg";
import logoDesktop from "./../../assets/logo-desktop.svg";

export const HeaderContainer = styled.header`
  background-color: var(--c-gray-200);
  height: 4.375rem;

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;

    & > h2 {
      background-image: url(${logoMobile});
      background-repeat: no-repeat;
      width: 3.125rem;
      height: 2rem;

      @media screen and (min-width: 768px) {
        background-image: url(${logoDesktop});
        width: 9.375rem;
      }
    }
  }

  .menu__container {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    position: relative;

    & > button {
      font-size: 1.125rem;
      color: var(--c-gray-600);
      padding: 0.25rem;
    }
  }
`;
