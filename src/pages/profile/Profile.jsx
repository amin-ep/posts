import { useState } from "react";
import ProfileForm from "./ProfileForm";
import ProfileHeader from "./ProfileHeader";
import ModalMessage from "../../ui/ModalMessage";
import LinkButton from "../../ui/LinkButton";
import { useAuthentication } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { deleteMe } = useAuthentication();
  const [selectedImage, setSelectedImage] = useState("");
  const [openMessage, setOpenMessage] = useState(false);

  const navigate = useNavigate();

  const validateFileType = (fileType) => {
    const type = fileType.split("/")[0];

    if (type !== "image") {
      throw new Error("File should be image");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    validateFileType(e.target.files[0].type);
    setSelectedImage(file);
  };

  const handleDeleteUser = async () => {
    const result = await deleteMe();

    if (result.status === 204) {
      navigate("/signup");
    }
  };

  return (
    <>
      <div className="h-dvh my-10 md:my-0 flex items-center justify-center">
        <main className="bg-stone-900/85 sm:bg-stone-900 flex flex-col gap-3 w-[60rem] max-w-full text-white p-5 rounded-xl shadow-stone-700 shadow-2xl">
          <ProfileHeader
            selectedImage={selectedImage}
            handleFileChange={handleFileChange}
          />
          <ProfileForm
            selectedImage={selectedImage}
            openModalMessage={() => setOpenMessage(true)}
          />
        </main>
      </div>
    </>
  );
}

export default Profile;
