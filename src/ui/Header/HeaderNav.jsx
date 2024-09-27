import { NavLink, useNavigate } from "react-router-dom";
import LinkButton from "../../ui/LinkButton";
import { useAuthentication } from "../../contexts/AuthContent";
import { HiMiniArrowRightEndOnRectangle } from "react-icons/hi2";

function HeaderNav() {
  const { isLoggedIn, logout } = useAuthentication();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <nav>
      <ul className="flex items-center gap-4">
        {!isLoggedIn ? (
          <>
            <li>
              <NavLink
                className="bg-transparent flex items-center text-teal-700 hover:shadow-xl p-3 hover:text-stone-900 transition-all duration-300 rounded-full"
                to="login"
              >
                <HiMiniArrowRightEndOnRectangle size={23} />
                <span>Login</span>
              </NavLink>
            </li>
            <li>
              <NavLink className="btn bg-teal-600 text-white" to="signup">
                Signup
              </NavLink>
            </li>
          </>
        ) : (
          <li>
            <LinkButton onClick={handleLogout} width="100px" type="button">
              Logout
            </LinkButton>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default HeaderNav;
