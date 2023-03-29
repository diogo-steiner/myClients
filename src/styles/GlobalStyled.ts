import { createGlobalStyle } from "styled-components";

export const GlobalStyled = createGlobalStyle`
  :root {
    --c-primary: #00B37E;
    --c-gray-100: #121214;
    --c-gray-200: #202024;
    --c-gray-300: #29292E;
    --c-gray-400: #323238;
    --c-gray-500: #7C7C8A;
    --c-gray-600: #8D8D99;
    --c-gray-700: #E1E1E6;
    --c-negative: #F75A68;
    --c-black-overlay: rgba(0, 0 ,0 ,70%);
    --c-white: #ffffff;

    --f-size-1: 2rem;
    --f-size-2: 1.25rem;
    --f-size-3: 1rem;
    --f-size-4: 0.875rem;
    --f-size-5: 0.75rem;
    --f-weight-1: 700;
    --f-weight-2: 600; 
    --f-weight-3: 500; 
    --f-weight-4: 400; 

    --b-radius: 0.375rem;
  }

  html {
    font-size: 87.5%;

    @media screen and (min-width: 768px) {
      font-size: 100%;
    }
  }
  
  body {
    color: var(--c-gray-700);
    font-family: 'Roboto', sans-serif;
    background-color: var(--c-gray-100);
  }
`;
