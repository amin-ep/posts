import { Link, NavLink, useNavigate } from "react-router-dom";
import LinkButton from "../LinkButton";
import { useAuthentication } from "../../contexts/AuthContent";
import { HiMiniArrowRightEndOnRectangle } from "react-icons/hi2";
import { useNotification } from "../../hooks/useNotification";

function HeaderActions() {
  const { isLoggedIn, logout, currentUserData } = useAuthentication();
  const navigate = useNavigate();

  const { notify } = useNotification();

  const handleLogout = () => {
    logout();
    navigate("/login");
    notify("success", "You are now logout");
  };
  return (
    <div>
      <ul className="flex items-center gap-4">
        {!isLoggedIn ? (
          <>
            <li>
              <NavLink
                className="bg-transparent flex items-center hover:border-solid hover:border-indigo-600 hover:bg-indigo-600 hover:text-white text-indigo-700 border-2 border-indigo-700 py-2 px-4 border-dashed transition-all duration-300 rounded-md"
                to="login"
              >
                <HiMiniArrowRightEndOnRectangle size={23} />
                <span>Login</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className="bg-indigo-700 text-white py-2 px-4 border-2 border-indigo-700 rounded-md hover:bg-indigo-900 hover:border-indigo-900"
                to="signup"
              >
                Signup
              </NavLink>
            </li>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <li>
              <Link
                to="/account"
                className="grid grid-cols-[auto_50px] grid-rows-[100%] items-center rounded-full border-2 py-1 pl-1 gap-1 border-gray-200 hover:border-white hover:shadow-2xl hover:shadow-black/30 transition duration-300 min-w-40"
              >
                <span>{currentUserData?.username}</span>
                <img
                  src={`http://localhost:3000/static/users/${currentUserData?.image}`}
                  alt="profile"
                  className="w-[45px] h-[45px] object-cover rounded-full"
                />
              </Link>
            </li>
            <li>
              <LinkButton
                onClick={handleLogout}
                width="100px"
                type="button"
                background="dark"
              >
                Logout
              </LinkButton>
            </li>
          </div>
        )}
      </ul>
    </div>
  );
}

export default HeaderActions;
