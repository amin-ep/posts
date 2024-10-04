import styled, { keyframes } from "styled-components";

const spinnerRotating = keyframes`
        to {
        transform: rotate(1turn)
    }
`;

const StyledDiv = styled.div`
  width: 100px;
  aspect-ratio: 1;
  display: grid;
  border: 4px solid var(--color-white);
  border-radius: 50%;
  border-right-color: var(--color-blue-600);
  animation: ${spinnerRotating} 1s infinite linear;

  &::after,
  &::before {
    content: "";
    grid-area: 1/1;
    margin: 2px;
    border: inherit;
    border-radius: 50%;
    animation: ${spinnerRotating} 2s infinite;
  }

  &::after {
    margin: 8px;
    animation-duration: 3s;
  }
`;

function Spinner() {
  return (
    <div className="flex items-center justify-center h-dvh">
      <StyledDiv></StyledDiv>
    </div>
  );
}

export default Spinner;
