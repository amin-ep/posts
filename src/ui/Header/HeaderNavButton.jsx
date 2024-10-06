/* eslint-disable react/prop-types */
import styled from "styled-components";
import { HiBars3BottomLeft } from "react-icons/hi2";
const Button = styled.button`
  @media (min-width: 840px) {
    display: none;
  }
`;

function HeaderNavButton({ onClick }) {
  return (
    <Button onClick={onClick}>
      <HiBars3BottomLeft size={30} />
    </Button>
  );
}

export default HeaderNavButton;
