import { useState } from "react";
import AccountHeader from "../../features/account/AccountHeader";
import AccountForm from "../../features/account/AccountForm";

function Account() {
  const [selectedImage, setSelectedImage] = useState("");

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

  return (
    <div className="w-full flex items-center justify-center overflow-auto relative">
      <div className="linear-background h-max w-[90%] flex flex-col gap-3 max-w-full text-stone-900 p-5 rounded-xl shadow-stone-700 shadow-2xl">
        <AccountHeader
          selectedImage={selectedImage}
          handleFileChange={handleFileChange}
        />
        <AccountForm selectedImage={selectedImage} />
      </div>
    </div>
  );
}

export default Account;
