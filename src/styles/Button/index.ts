import styled, { css } from "styled-components";

interface IButtonStyledProps {
  variant?: "primary" | "outlineGreen" | "outlineRed";
  width?: number;
  m?: number;
  mt?: number;
  mb?: number;
  my?: number;
  mx?: number;
}

export const buttonOptions = {
  primary: css`
    background-color: var(--c-gray-300);
  `,
  outlineGreen: css`
    border-color: var(--c-primary);
  `,
  outlineRed: css`
    color: var(--c-negative);
    border-color: var(--c-negative);
  `,
};

export const ButtonStyled = styled.button<IButtonStyledProps>`
  color: var(--c-primary);
  font-size: var(--f-size-3);
  font-weight: var(--f-weight-2);
  padding: 1rem 2rem;
  border-radius: var(--b-radius);
  border: 1px solid transparent;
  ${({ variant }) => buttonOptions[variant || "primary"]}
  margin: ${({ m, mt, mb, my, mx }) => {
    if (m) {
      return css`
        ${m / 16}rem;
      `;
    }
    if (mt) {
      return css`
        ${mt / 16}rem 0 0
      `;
    }
    if (mb) {
      return css`
        0  0 ${mb / 16}rem
      `;
    }
    if (my) {
      return css`
        ${my / 16}rem 0;
      `;
    }
    if (mx) {
      return css`
        0 ${mx / 16}rem;
      `;
    }
  }};
  width: 100%;
`;
