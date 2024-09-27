import axios from "axios";
import Input from "../../ui/Input";
import { BASE_URL } from "../../utils/helpers";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useReducer, useState } from "react";
import { useNotification } from "../../hooks/useNotification";
import Cookies from "js-cookie";
import { useInput } from "../../hooks/useInput";
import { validateDescription, validateTitle } from "../../utils/validators";
import LinkButton from "../../ui/LinkButton";
import { ToastContainer } from "react-toastify";
import BackLink from "../../ui/BackLink";
import { HiArrowDownTray } from "react-icons/hi2";

const initialState = {
  loading: false,
  post: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true };

    case "idle":
      return { ...state, loading: false };

    case "data":
      return { ...state, post: action.payload };

    // case "update":
    //   return { ...state, post: action.payload };

    default:
      throw new Error("unknown action type");
  }
};

function UpdatePost() {
  const [{ loading, post }, dispatch] = useReducer(reducer, initialState);
  const [selectedImage, setSelectedImage] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  const { id } = useParams();

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

  useEffect(() => {
    if (enteredTitle !== post?.title) {
      if (titleIsValid) {
        setFormIsValid(true);
      }
    } else {
      setFormIsValid(false);
    }

    if (enteredDescription !== post?.description) {
      if (descriptionIsValid) {
        setFormIsValid(true);
      }
    } else {
      setFormIsValid(false);
    }

    if (
      enteredTitle !== post?.title &&
      enteredDescription === post?.description
    ) {
      setFormIsValid(true);
    } else if (
      enteredDescription !== post?.description &&
      enteredTitle === post?.title
    ) {
      setFormIsValid(true);
    }
  }, [
    descriptionIsValid,
    titleIsValid,
    enteredDescription,
    enteredTitle,
    post,
  ]);
  const { notify } = useNotification();

  const getPostDataById = useCallback(async () => {
    try {
      const token = Cookies.get("token");
      dispatch({
        type: "loading",
      });
      const res = await axios.get(`${BASE_URL}/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (res.data.status === "success") {
        dispatch({
          type: "data",
          payload: res.data.data.doc,
        });
      }
    } catch (err) {
      // notify('error');
      console.log(err);
    } finally {
      dispatch({
        type: "idle",
      });
    }
  }, [id]);

  useEffect(() => {
    getPostDataById();
  }, [getPostDataById]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
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

    try {
      dispatch({
        type: "loading",
      });
      const res = await axios.patch(`${BASE_URL}/posts/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        notify("success", "Your post updated successfully");
      } else {
        notify("error", "something is went wrong");
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({
        type: "idle",
      });
    }
  };

  return (
    <>
      <BackLink />
      <ToastContainer limit={3} />
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
