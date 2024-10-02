/* eslint-disable react/prop-types */
import HeaderNav from "./HeaderNav";
import styled from "styled-components";
import HeaderLogo from "./HeaderLogo";
import HeaderActions from "./HeaderActions";

const StyledHeader = styled.header`
  animation-name: toBottom;
  -webkit-animation-name: toBottom;
  animation-fill-mode: both;
  -webkit-animation-fill-mode: both;
  animation-duration: 0.5s all;
  -webkit-animation-duration: 0.5s;
  box-shadow: 2px 10px 4px rgba(0, 0, 0, 0.2);

  @keyframes toBottom {
    from {
      transform: translate(0, -210px);
    }
    to {
      transform: translate(0, 0);
    }
  }
`;

function Header() {
  return (
    <StyledHeader className="grid grid-cols-[120px_auto] gap-6 bg-white p-3">
      <HeaderLogo />
      <div className="flex justify-between items-center">
        <HeaderNav />
        <HeaderActions />
      </div>
    </StyledHeader>
  );
}

export default Header;
