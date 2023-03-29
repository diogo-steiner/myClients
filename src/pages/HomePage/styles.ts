import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 4.375rem);
`;

export const CallToAction = styled.section`
  padding: 2rem;
  text-align: center;
  background-color: var(--c-gray-200);
  border-radius: var(--b-radius);

  h2 {
    font-size: var(--f-size-1);
    max-width: 31.5rem;
    line-height: 1.6;

    strong {
      color: var(--c-primary);
    }
  }

  button {
    margin-top: 2rem;
  }
`;
