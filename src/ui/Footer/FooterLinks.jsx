import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  TbBrandGithubFilled,
  TbBrandInstagram,
  TbBrandTelegram,
} from "react-icons/tb";

const StyledLi = styled.li`
  transition: 0.3s all;
  font-size: 36px;
  padding: 0.2rem;
  border-radius: 6px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    transform: scale(1.2);
  }
`;

function FooterLinks() {
  return (
    <ul className="flex justify-center items-center sm:justify-start gap-3">
      <StyledLi className="text-white bg-stone-800">
        <Link to="https://github.com/amin-ep" target="_blank">
          <TbBrandGithubFilled />
        </Link>
      </StyledLi>
      <StyledLi className="bg-[#229ed9] text-white">
        <Link to="https://t.me/am_in_o" target="_blank">
          <TbBrandTelegram />
        </Link>
      </StyledLi>
      <StyledLi className="">
        <Link to="/" target="_blank">
          <img
            className="w-full h-full object-cover"
            src="/images/gmail-icon.webp"
            alt="gmail"
          />
        </Link>
      </StyledLi>
      <StyledLi className="text-white from-[#833ab4] via-[#fd1d1d] to-[#fcb045] bg-gradient-to-br rounded-md">
        <Link to="/" target="_blank">
          <TbBrandInstagram />
        </Link>
      </StyledLi>
    </ul>
  );
}

export default FooterLinks;
