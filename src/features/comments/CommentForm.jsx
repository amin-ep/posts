/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { useInput } from "../../hooks/useInput";
import { fetchCreateCommentOnPost } from "./commentSlice";
// import { useCallback, useEffect, useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
import { IoSendOutline } from "react-icons/io5";
import { useNotification } from "../../hooks/useNotification";
import Textarea from "../../ui/Textarea";
import LinkButton from "../../ui/LinkButton";
import styled from "styled-components";
import styles from "./CommentForm.module.css";

const validateComment = (value) => value.length >= 1 && value.length <= 200;

const Form = styled.form`
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas: "form-header form-header form-header" "comment-input comment-input comment-input" "comment-submit . .";
`;

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
      <Form
        onSubmit={handleSubmit}
        className="hidden sm:grid"
        id="comment-form"
      >
        <header
          className={`text-gray-700 py-4 flex justify-between items-center ${styles.header}`}
        >
          <h2 className="text-3xl">Leave Your Comment Here</h2>
        </header>
        <div className={styles["textarea-wrapper"]}>
          <Textarea
            placeholder="Leave comment..."
            id="comment"
            value={enteredComment}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          ></Textarea>
          {inputHasError && (
            <p className="text-error">
              Please Input a valid comment (1-250 characters)
            </p>
          )}
        </div>
        <div className={styles["from-action"]}>
          <LinkButton background="indigo" type="submit" disabled={!formIsValid}>
            {isLoading ? "Loading..." : "Send"}
          </LinkButton>
        </div>
      </Form>
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
          className="bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-600 text-white outline-none flex items-center justify-center w-16 h-16"
        >
          <IoSendOutline size={23} />
        </button>
      </form>
    </>
  );
}

export default CommentForm;
