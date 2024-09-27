import { useAuthentication } from "../../contexts/AuthContent";
import NavListItem from "./NavListItem";
import {
  HiOutlineHome,
  HiOutlinePhoto,
  HiOutlineUsers,
  HiOutlineIdentification,
  HiOutlineExclamationCircle,
} from "react-icons/hi2";

function MainNav() {
  const { isLoggedIn, currentUserData } = useAuthentication();
  return (
    <nav>
      <ul className="list-none flex flex-col gap-4">
        <NavListItem to="dashboard" icon={<HiOutlineHome size={25} />}>
          <span className="text-stone-900">Home</span>
        </NavListItem>
        {isLoggedIn && currentUserData?.role === "admin" && (
          <>
            <NavListItem to="createPost" icon={<HiOutlinePhoto size={25} />}>
              <span className="text-stone-900">Create Post</span>
            </NavListItem>
            <NavListItem to="users" icon={<HiOutlineUsers size={25} />}>
              <span className="text-stone-900">Users</span>
            </NavListItem>
          </>
        )}

        {isLoggedIn && (
          <NavListItem
            to="account"
            icon={<HiOutlineIdentification size={25} />}
          >
            <span className="text-stone-900">Account</span>
          </NavListItem>
        )}

        <NavListItem to="about" icon={<HiOutlineExclamationCircle size={25} />}>
          About
        </NavListItem>
      </ul>
    </nav>
  );
}

export default MainNav;
