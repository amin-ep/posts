import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAuthentication } from "../../contexts/AuthContent";

const StyledNavLink = styled(NavLink)`
  color: #374151;
  transition: 0.4s;
  &:hover {
    color: #111827;
    letter-spacing: 2px;
  }

  .active {
    color: red;
  }
`;

function HeaderNav() {
  const { isLoggedIn, currentUserData } = useAuthentication();
  return (
    <nav>
      <ul className="flex gap-8">
        <li>
          <StyledNavLink to="/">Home</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/about">About</StyledNavLink>
        </li>
        {isLoggedIn && currentUserData?.role === "admin" && (
          <>
            <li>
              <StyledNavLink to="/create-post">Create Post</StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="/users">Users</StyledNavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default HeaderNav;
