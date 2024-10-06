import { NavLink as BaseNavLink } from "react-router-dom";
import styled from "styled-components";
import { useAuthentication } from "../../contexts/AuthContent";

const NavLink = styled(BaseNavLink)`
  color: #374151;
  transition: 0.4s;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  &:hover {
    color: var(--color-indigo-700);
    letter-spacing: 2px;
  }

  &.active {
    background: var(--color-gray-200);
  }
`;

function HeaderNav() {
  const { isLoggedIn, currentUserData } = useAuthentication();
  return (
    <nav>
      <ul className="flex gap-2">
        <li>
          <NavLink id="home-link" to="/home">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink id="about-link" to="/about">
            About
          </NavLink>
        </li>
        {isLoggedIn && currentUserData?.role === "admin" && (
          <>
            <li>
              <NavLink id="create-post-link" to="/create-post">
                Create Post
              </NavLink>
            </li>
            <li>
              <NavLink id="users-link" to="/users">
                Users
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default HeaderNav;
