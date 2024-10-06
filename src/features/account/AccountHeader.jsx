/* eslint-disable react/prop-types */
import { HiMiniArrowUpTray } from "react-icons/hi2";
import { formatDate } from "../../utils/helpers";
import { useAuthentication } from "../../contexts/AuthContent";
import LinkButton from "../../ui/LinkButton";
import { useNavigate } from "react-router-dom";
import AlertModal from "../../ui/AlertModal";
import { useState } from "react";

function AccountHeader({ selectedImage, handleFileChange }) {
  const { currentUserData, loading, deleteMe } = useAuthentication();
  const [throwAlert, setThrowAlert] = useState(false);

  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    const result = await deleteMe();

    if (result.status === 204) {
      navigate("/signup");
    }
    alert("");
  };

  return (
    <>
      <AlertModal
        onClose={() => setThrowAlert(false)}
        isOpen={throwAlert}
        title="Delete me"
        description="Are you sure you want to delete your account?"
        onDelete={handleDeleteUser}
      />
      <header className="gap-7 text-center relative grid grid-cols-[auto] grid-rows-[10rem_auto_min-content] justify-center">
        <div className="relative flex items-center justify-center">
          <img
            src={
              selectedImage === ""
                ? `http://localhost:3000/static/users/${currentUserData?.image}`
                : URL.createObjectURL(selectedImage)
            }
            alt={currentUserData?.username}
            className="w-36 h-36 object-cover object-center rounded-full outline-4 outline-gray-800 outline-offset-4 outline"
            width={144}
            height={144}
            loading="lazy"
          />
          <div className="absolute w-14 h-14 flex items-center justify-center rounded-full cursor-pointer right-12 bg-indigo-600 text-white text-2xl top-28">
            <HiMiniArrowUpTray className="z-20 cursor-pointer" />
            <input
              type="file"
              className="w-full h-full block z-30 absolute opacity-0 cursor-pointer top-0 left-0 bottom-0 right-0"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="text-center text-gray-800">
          <h1 className="text-2xl md:text-3xl lg:text-4xl">
            {currentUserData?.username}
          </h1>
          <p>{loading ? "Loading..." : currentUserData?.email}</p>
          <p>
            {loading
              ? "Loading..."
              : `Created account ${formatDate(currentUserData?.createdAt)}`}
          </p>
        </div>

        <LinkButton
          type="button"
          background="red"
          onClick={() => setThrowAlert(true)}
        >
          {" "}
          Delete Me
        </LinkButton>
      </header>
    </>
  );
}

export default AccountHeader;
