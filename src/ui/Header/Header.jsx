/* eslint-disable react/prop-types */
import HeaderNav from "./HeaderNav";
import styled from "styled-components";
import HeaderLogo from "./HeaderLogo";
import HeaderActions from "./HeaderActions";
import HeaderNavButton from "./HeaderNavButton";
import ModalNav from "./ModalNav";
import { useEffect, useState } from "react";

const StyledHeader = styled.header`
  animation-name: toBottom;
  -webkit-animation-name: toBottom;
  animation-fill-mode: both;
  -webkit-animation-fill-mode: both;
  animation-duration: 0.5s all;
  -webkit-animation-duration: 0.5s;
  box-shadow: 2px 10px 4px rgba(0, 0, 0, 0.2);

  display: grid;
  grid-template: 60px / 120px auto 1fr;
  grid-column-gap: 0.75rem;
  align-items: center;
  justify-content: flex-start;

  @keyframes toBottom {
    from {
      transform: translate(0, -210px);
    }
    to {
      transform: translate(0, 0);
    }
  }

  @media (max-width: 840px) {
    grid-template: 60px / auto auto;

    justify-content: space-between;

    & > nav {
      display: none;
    }
  }
`;

function Header() {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    if (openNav) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [openNav]);

  return (
    <>
      <ModalNav isOpen={openNav} onClose={() => setOpenNav(false)} />
      <StyledHeader className="bg-white p-3">
        <HeaderNavButton onClick={() => setOpenNav(true)} />
        <HeaderLogo />
        <HeaderNav />
        <HeaderActions />
      </StyledHeader>
    </>
  );
}

export default Header;
