import { useState } from "react";
import Input from "../../ui/Input";
import { useInput } from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreatePost } from "../post/postSlice";
import FileInput from "../../ui/FileInput";
import { validateTitle, validateDescription } from "../../utils/validators";
import { useNotification } from "../../hooks/useNotification";
import { ToastContainer } from "react-toastify";

function CreatePost() {
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.post.status === "loading");

  const {
    value: enteredTitle,
    handleInputChange: handleTitleChange,
    handleInputBlur: handleTitleBlur,
    inputIsValid: titleIsValid,
    inputHasError: titleHasError,
  } = useInput(validateTitle);

  const {
    value: enteredDescription,
    handleInputChange: handleDescriptionChange,
    handleInputBlur: handleDescriptionBlur,
    inputIsValid: descriptionIsValid,
    inputHasError: descriptionHasError,
  } = useInput(validateDescription);

  const { notify } = useNotification();

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

  const submitHandler = async (e) => {
    e.preventDefault();

    const payload = new FormData();

    payload.append("title", enteredTitle);
    payload.append("description", enteredDescription);
    payload.append("image", selectedImage);

    const result = await dispatch(fetchCreatePost(payload));

    if (result.status === "success") {
      notify("success", "Your post uploaded successfully");
    }
  };

  let formIsValid = false;
  if (titleIsValid && descriptionIsValid && selectedImage !== null)
    formIsValid = true;

  return (
    <>
      <ToastContainer limit={3} />
      <div className="bg-white/50 backdrop-blur-md shadow-lg shadow-black/45 w-[50rem] max-w-[95%] h-min rounded-md">
        <header className="text-center py-5">
          <h1 className="text-4xl"> Create Post</h1>
        </header>
        <form
          className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-10 p-6"
          onSubmit={submitHandler}
        >
          <div>
            <FileInput
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              handleFileChange={handleFileChange}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Input
              placeholder="title"
              value={enteredTitle}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              type="text"
              name="title"
              id="title"
              hasError={titleHasError}
            />
            {titleHasError && (
              <p className="text-error">
                Please input a valid title (3-20 characters)
              </p>
            )}
            <div>
              <textarea
                placeholder="description"
                className={`${
                  descriptionHasError
                    ? `bg-red-300 border-red-500 text-stone-900 placeholder:text-stone-700`
                    : `bg-white border-gray-200`
                } px-5 py-3 border-2 rounded-md w-full h-60 outline-none transition-all resize-y duration-500`}
                value={enteredDescription}
                onChange={handleDescriptionChange}
                onBlur={handleDescriptionBlur}
              ></textarea>
              {descriptionHasError && (
                <p className="text-error">
                  Please input a valid description (10-400 characters)
                </p>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="bg-stone-800 w-full rounded-full px-5 py-3 text-white disabled:cursor-not-allowed"
                disabled={!formIsValid}
              >
                {isLoading ? "Loading..." : "Create"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreatePost;
