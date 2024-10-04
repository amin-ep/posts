/* eslint-disable react/prop-types */
import { memo } from "react";
import { BsCloudUpload } from "react-icons/bs";
import styles from "./FileInput.module.css";
import { useNotification } from "../../hooks/useNotification";
import { HiOutlineTrash } from "react-icons/hi2";

const FileInput = memo(function FileInput({
  handleFileChange,
  selectedImage,
  setSelectedImage,
  imageName,
}) {
  const { notify } = useNotification();
  return (
    <>
      {selectedImage ? (
        <div
          className={`${styles["image-input-wrapper"]} flex items-center justify-center relative`}
        >
          <button
            onClick={() => {
              setSelectedImage(null);
              notify("success", "image deleted successfully");
            }}
            className={`bg-red-600 absolute text-white w-14 h-14 rounded-full flex items-center justify-center ${
              imageName === "profile"
                ? "bottom-0 translate-x-[52px]"
                : imageName === "post"
                ? "top-3 sm:translate-x-[120px] translate-x-[100px]"
                : ""
            }`}
          >
            <HiOutlineTrash size={36} />
          </button>
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="post image"
            className={`object-cover ${
              imageName === "post"
                ? "w-80 rounded-md h-52"
                : "rounded-full w-40 h-40"
            }`}
          />
        </div>
      ) : (
        <div
          className={`${styles["image-input-wrapper"]} text-gray-700 relative h-40 rounded-lg border-4 border-dashed border-gray-700`}
        >
          <div className="flex flex-col items-center p-3 font-semibold">
            <BsCloudUpload size={100} />
            <p className="text-xl">Click to upload your image</p>
          </div>
          <input
            type="file"
            name="profile-input"
            onChange={handleFileChange}
            id="profile"
            className="w-full absolute top-0 bottom-0 right-0 left-0 opacity-0 cursor-pointer"
          />
        </div>
      )}
    </>
  );
});

export default FileInput;
