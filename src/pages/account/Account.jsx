import { useState } from "react";
import AccountHeader from "../../features/account/AccountHeader";
import AccountForm from "../../features/account/AccountForm";
import Container from "../../ui/Container/Container";

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
    <Container size="small" extraClasses="rounded-lg py-6">
      <AccountHeader
        selectedImage={selectedImage}
        handleFileChange={handleFileChange}
        setSelectedImage={setSelectedImage}
      />
      <AccountForm selectedImage={selectedImage} />
    </Container>
  );
}

export default Account;
