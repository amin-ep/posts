/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { useInput } from "../../hooks/useInput";
import { fetchCreateCommentOnPost } from "./commentSlice";
// import { useCallback, useEffect, useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
import { IoSendOutline } from "react-icons/io5";
import { useNotification } from "../../hooks/useNotification";

const validateComment = (value) => value.length >= 1 && value.length <= 200;

function CommentForm({ postId, replyTo }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.comment.status === "loading");

  const {
    value: enteredComment,
    handleInputChange,
    inputIsValid,
    inputHasError,
    handleInputBlur,
    reset,
  } = useInput(validateComment);

  const { notify } = useNotification();

  let formIsValid = false;
  if (inputIsValid) formIsValid = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (enteredComment.length >= 1 && postId) {
      const payload = new FormData();
      payload.append("post", postId);
      payload.append("text", enteredComment);
      if (replyTo) {
        payload.append("parentComment", replyTo);
      }

      const result = await dispatch(
        fetchCreateCommentOnPost({ payload, postId })
      );

      if (result?.meta?.requestStatus === "fulfilled") {
        reset();
        notify("success", "Your comment published successfully");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="hidden sm:block">
        <header className="text-stone-900 py-4 flex justify-between items-center">
          <h2 className="text-3xl">Leave Your Comment Here</h2>
        </header>
        <textarea
          placeholder="Leave comment..."
          id="comment"
          className={`${
            inputHasError
              ? `bg-red-300 border-red-500 text-stone-900 placeholder:text-stone-700`
              : `bg-white border-gray-200`
          } px-5 py-3 border-2 rounded-md w-full h-60 resize-y outline-none transition-all duration-500`}
          value={enteredComment}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        ></textarea>
        {inputHasError && (
          <p className="text-error">
            Please Input a valid comment (1-250 characters)
          </p>
        )}
        <button
          className="bg-blue-600 rounded-full px-5 py-3 text-white disabled:cursor-not-allowed w-2/12"
          type="submit"
          disabled={!formIsValid}
        >
          {isLoading ? "Loading..." : "Send"}
        </button>
      </form>
      <form
        className="fixed bottom-0 z-50 mb-0 left-0 w-full h-16 flex flex-row sm:hidden"
        onSubmit={handleSubmit}
      >
        <textarea
          placeholder="Leave comment..."
          value={enteredComment}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          id="fixed-comment-input"
          className="w-full bg-white shadow-2xl shadow-black/90 p-2 resize-none h-full overflow-scroll outline-none"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 outline-none flex items-center justify-center w-16 h-16"
        >
          <IoSendOutline size={23} />
        </button>
      </form>
    </>
  );
}

export default CommentForm;
