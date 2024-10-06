/* eslint-disable react/prop-types */
import { NavLink as BaseNavLink } from "react-router-dom";
import styled from "styled-components";

const NavLink = styled(BaseNavLink)`
  background-color: var(--color-gray-50);
  display: flex;
  align-items: center;
  grid-gap: 0.5rem;
  padding: 1rem;
  border-radius: 0.3rem;

  &.active {
    background-color: var(--color-gray-200);
    color: var(--color-indigo-800);
  }

  &:hover {
    color: var(--color-indigo-800);
  }
`;

function ModalNavListItem({ icon, children, to, onClose }) {
  return (
    <li>
      <NavLink to={to} onClick={onClose}>
        {icon}
        <span>{children}</span>
      </NavLink>
    </li>
  );
}

export default ModalNavListItem;
