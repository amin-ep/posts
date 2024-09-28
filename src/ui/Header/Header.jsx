/* eslint-disable react/prop-types */
import { HiBars3BottomLeft } from "react-icons/hi2";
import HeaderNav from "./HeaderNav";
import styled from "styled-components";

const StyledHeader = styled.header`
  animation-name: toBottom;
  -webkit-animation-name: toBottom;
  animation-fill-mode: both;
  -webkit-animation-fill-mode: both;
  animation-duration: 0.5s all;
  -webkit-animation-duration: 0.5s;

  @keyframes toBottom {
    from {
      transform: translate(0, -210px);
    }
    to {
      transform: translate(0, 0);
    }
  }
`;

function Header({ setOpenSidebar }) {
  return (
    <StyledHeader className="bg-white flex items-center transition justify-between p-4 border-b-gray-100">
      <button className="text-3xl" onClick={() => setOpenSidebar((s) => !s)}>
        <HiBars3BottomLeft />
      </button>
      <HeaderNav />
    </StyledHeader>
  );
}

export default Header;
