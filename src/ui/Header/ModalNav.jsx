/* eslint-disable react/prop-types */
import ReactModal from "react-modal";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuthentication } from "../../contexts/AuthContent";
import {
  HiOutlineHome,
  HiOutlineUserGroup,
  HiOutlineFolderPlus,
  HiOutlineInformationCircle,
  HiOutlineLockOpen,
  HiOutlineUserPlus,
  HiArrowRightStartOnRectangle,
  HiMiniXMark,
} from "react-icons/hi2";
import ModalNavListItem from "./ModalNavListItem";

ReactModal.setAppElement("#nav");

const styles = {
  content: {
    top: 0,
    left: 0,
    bottom: 0,
    width: "25rem",
    maxWidth: "100%",
  },

  overlay: {
    background: "#00000068",
    backdropFilter: "blur(5px)",
  },
};

const AuthLink = styled(NavLink)`
  padding: 1rem;
  display: flex;
  align-items: center;
  grid-gap: 1rem;
  background: var(--color-indigo-700);
  border-radius: 6px;
  color: #fff;
`;

function ModalNav({ isOpen, onClose }) {
  const { isLoggedIn, currentUserData, logout } = useAuthentication();

  const navigate = useNavigate();

  return (
    <ReactModal
      style={styles}
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
    >
      <nav className="flex flex-col p-3">
        <div className="flex justify-between items-center">
          <img
            src="/public/images/logo-icon-dark.svg"
            alt="Logo"
            className="w-32 object-cover"
          />
          <button onClick={onClose}>
            <HiMiniXMark size={25} />
          </button>
        </div>
        <ul className="grid grid-cols-1 gap-4">
          {isLoggedIn && (
            <div className="mt-10 mb-3 grid grid-cols-1 items-center justify-between gap-2 h14">
              <li>
                <NavLink className="grid grid-cols-[1fr_60px] items-center border-2 border-indigo-700 bg-indigo-700 text-white gap-2 pl-2 pr-0 justify-between rounded-full">
                  <span>{currentUserData?.username}</span>
                  <img
                    src={`http://localhost:3000/static/users/${currentUserData?.image}`}
                    alt="profile-image"
                    className="rounded-full w-14 h-14 object-cover"
                  />
                </NavLink>
              </li>
              <li>
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="flex w-full items-center px-2 justify-center h-14 gap-2 border-2 border-gray-200 rounded-full text-stone-800 hover:bg-indigo-700 hover:border-indigo-700 hover:text-white hover:gap-3 transition duration-300"
                >
                  <HiArrowRightStartOnRectangle size={25} />
                  <span>Logout</span>
                </button>
              </li>
            </div>
          )}
          <>
            <ModalNavListItem
              onClose={onClose}
              icon={<HiOutlineHome size={25} />}
              to="/home"
            >
              Home
            </ModalNavListItem>
            <ModalNavListItem
              onClose={onClose}
              icon={<HiOutlineInformationCircle size={25} />}
              to="/about"
            >
              About
            </ModalNavListItem>
          </>
          {isLoggedIn && currentUserData?.role === "admin" && (
            <>
              <ModalNavListItem
                onClose={onClose}
                icon={<HiOutlineFolderPlus size={25} />}
                to="/create-post"
              >
                Create post
              </ModalNavListItem>

              <ModalNavListItem
                onClose={onClose}
                icon={<HiOutlineUserGroup size={25} />}
                to="users"
              >
                Users
              </ModalNavListItem>
            </>
          )}
          {!isLoggedIn && (
            <>
              <li>
                <AuthLink to="/signup">
                  <HiOutlineUserPlus size={25} />
                  <span>Signup</span>
                </AuthLink>
              </li>
              <li>
                <AuthLink to="/login">
                  <HiOutlineLockOpen size={25} />
                  <span>Login</span>
                </AuthLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </ReactModal>
  );
}

export default ModalNav;
