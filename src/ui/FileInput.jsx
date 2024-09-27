/* eslint-disable react/prop-types */
import { memo } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
import { useLocation } from "react-router-dom";

const FileInput = memo(function FileInput({
  selectedImage,
  handleFileChange,
  setSelectedImage,
}) {
  const location = useLocation();

  return (
    <div
      className={`p-0 m-auto bg-white ${
        location.pathname === "/signup"
          ? "rounded-full w-40 h-40"
          : "rounded-3xl w-60 h-48"
      } relative`}
    >
      <div
        className={`text-center text-stone-500 h-full border-stone-500 ${
          !selectedImage && "border-dashed border-4"
        } relative ${
          location.pathname === "/signup"
            ? "rounded-full"
            : "rounded-xl w-60 h-48"
        } flex flex-col items-center justify-center`}
      >
        {!selectedImage ? (
          <>
            <div className="p-10 text-8xl">
              <BsCloudUpload />
            </div>
            {!location.pathname === "/signup" && (
              <h1 className="font-semibold text-xl">Click To Upload</h1>
            )}
          </>
        ) : (
          <div>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt={selectedImage.name}
              className={`${
                location.pathname === "/signup"
                  ? "rounded-full h-40 w-40"
                  : "rounded-xl w-60 h-48"
              } object-cover object-center`}
            />
          </div>
        )}
        <input
          type="file"
          className={`absolute block top-0 left-0 right-0 bottom-0 opacity-0 cursor-pointer ${
            location.pathname === "/signup"
              ? "rounded-full"
              : "rounded-3xl w-60 h-48"
          }`}
          onChange={handleFileChange}
        />
      </div>
      {selectedImage && (
        <button
          className={`bg-red-700 text-white p-2 rounded-full text-2xl hover:bg-red-800 mt-3 absolute ${
            location.pathname === "/signup" ? "top-28 right-2" : "top-0 right-3"
          }`}
          onClick={() => setSelectedImage(null)}
          type="button"
        >
          <RiDeleteBinLine />
        </button>
      )}
    </div>
  );
});

export default FileInput;
