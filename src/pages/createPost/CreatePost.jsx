import { useState } from "react";
import Input from "../../ui/Input";
import { useInput } from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../features/post/postSlice";
import Container from "../../ui/Container/Container";
import { validateTitle, validateDescription } from "../../utils/validators";
import { useNotification } from "../../hooks/useNotification";
import { useNavigate } from "react-router-dom";
import Textarea from "../../ui/Textarea";
import FileInput from "../../ui/FileInput/FileInput";
import LinkButton from "../../ui/LinkButton";

function CreatePost() {
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const { loading: isCreating, result: creatingResult } = useSelector(
    (state) => state.post
  );

  const navigate = useNavigate();

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
      const message = "Profile should be an image";
      notify("error", message);
      throw new Error(message);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    validateFileType(e.target.files[0].type);
    setSelectedImage(file);
  };

  let formIsValid = false;
  if (titleIsValid && descriptionIsValid && selectedImage !== null)
    formIsValid = true;

  const submitHandler = (e) => {
    e.preventDefault();

    const payload = new FormData();

    payload.append("title", enteredTitle);
    payload.append("description", enteredDescription);
    payload.append("image", selectedImage);

    dispatch(createPost(payload)).then(() => {
      if (creatingResult.statusCode === 201) {
        notify("success", creatingResult.message);
        navigate("/dashboard");
      } else {
        notify("error", creatingResult.message);
      }
    });
  };

  return (
    <Container size="small" extraClasses="rounded-lg flex flex-col">
      <header className="text-center py-10">
        <h1 className="text-4xl text-gray-700 font-semibold"> Create Post</h1>
      </header>
      <form onSubmit={submitHandler} className="flex flex-col p-5 gap-3">
        <FileInput
          handleFileChange={handleFileChange}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          imageName="post"
        />
        <div>
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
        </div>
        <div>
          <Textarea
            hasError={descriptionHasError}
            value={enteredDescription}
            onBlur={handleDescriptionBlur}
            onChange={handleDescriptionChange}
            placeholder="Description..."
          />
          {descriptionHasError && (
            <p className="text-error">
              Please input a valid description (10-400 characters)
            </p>
          )}
        </div>
        <div>
          <LinkButton
            type="submit"
            className="bg-stone-800 w-full rounded-full px-5 py-3 text-white disabled:cursor-not-allowed"
            disabled={!formIsValid}
            background="blue"
          >
            {isCreating === "creating" ? "Creating..." : "Create"}
          </LinkButton>
        </div>
      </form>
    </Container>
  );
}

export default CreatePost;
