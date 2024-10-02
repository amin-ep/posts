import Input from "../../ui/Input";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNotification } from "../../hooks/useNotification";
import { useInput } from "../../hooks/useInput";
import { validateDescription, validateTitle } from "../../utils/validators";
import LinkButton from "../../ui/LinkButton";
import BackLink from "../../ui/BackLink";
import { HiArrowDownTray } from "react-icons/hi2";
import { useSelector, useDispatch } from "react-redux";
import { getPostById, updatePostById } from "../../features/post/postSlice";

function UpdatePost() {
  const [selectedImage, setSelectedImage] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  const { post, loading, result } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const { id } = useParams();
  const navigate = useNavigate();

  const { notify } = useNotification();

  const {
    value: enteredTitle,
    handleInputChange: handleTitleChange,
    handleInputBlur: handleTitleBlur,
    inputIsValid: titleIsValid,
    inputHasError: titleHasError,
  } = useInput(validateTitle, post?.title);

  const {
    value: enteredDescription,
    handleInputChange: handleDescriptionChange,
    handleInputBlur: handleDescriptionBlur,
    inputIsValid: descriptionIsValid,
    inputHasError: descriptionHasError,
  } = useInput(validateDescription, post?.description);

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

  useEffect(() => {
    if (titleIsValid && descriptionIsValid) {
      if (
        enteredTitle !== post?.title ||
        enteredDescription !== post?.description ||
        selectedImage !== ""
      ) {
        setFormIsValid(true);
      }
    }

    if (
      enteredTitle === post?.title &&
      enteredDescription === post?.description &&
      selectedImage === ""
    ) {
      setFormIsValid(false);
    }
  }, [
    descriptionIsValid,
    titleIsValid,
    enteredDescription,
    enteredTitle,
    post,
    selectedImage,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = new FormData();

    if (enteredTitle !== post?.title) {
      payload.append("title", enteredTitle);
    }
    if (enteredDescription !== post?.description) {
      payload.append("description", enteredDescription);
    }
    if (selectedImage !== "") {
      payload.append("image", selectedImage);
    }

    dispatch(updatePostById({ id, payload }))
      .then(() => {
        if (result.statusCode === 200) {
          notify("success", result.message);
          navigate(-1);
        } else {
          notify("error", result.message);
        }
      })
      .then(() => dispatch(getPostById(id)));
  };

  useEffect(() => {
    dispatch(getPostById(id));
  }, [dispatch, id]);

  return (
    <>
      <BackLink />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white/30 px-5 py-3 rounded-2xl shadow-xl shadow-black/30 w-[45rem] max-w-[95%] h-max"
      >
        <header className="text-center text-white p-5 text-3xl">
          <h1>Update Post</h1>
        </header>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex items-center justify-center relative">
            <img
              src={
                selectedImage !== ""
                  ? URL.createObjectURL(selectedImage)
                  : `http://localhost:3000/static/posts/${post?.image}`
              }
              alt={post?.title}
              className="w-72 rounded-md"
            />
            <div className="absolute text-white bg-white w-16 h-16 md:w-10 md:h-10 border-2 border-gray-300 flex items-center justify-center rounded-full">
              <span type="button" className="text-stone-900">
                <HiArrowDownTray size={30} />
              </span>
              <input
                type="file"
                className="top-0 absolute left-0 right-0 bottom-0 opacity-0 z-50 w-max h-max cursor-pointer"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-col">
              <label htmlFor="title">Title</label>
              <Input
                defaultValue={post?.title}
                hasError={titleHasError}
                id="title"
                name="title"
                onBlur={handleTitleBlur}
                onChange={handleTitleChange}
                value={enteredTitle}
                placeholder="Title"
                type="text"
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
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
              <LinkButton
                type="submit"
                disabled={!formIsValid}
                background="dark"
              >
                {loading ? "Loading..." : "Update"}
              </LinkButton>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default UpdatePost;
