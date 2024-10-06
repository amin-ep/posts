/* eslint-disable react/prop-types */
import {
  HiOutlineChatBubbleBottomCenterText,
  HiHeart,
  HiOutlineHeart,
} from "react-icons/hi2";

import { useAuthentication } from "../../contexts/AuthContent";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import styles from "./PostActions.module.css";
import { BASE_URL } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import LinkButton from "../../ui/LinkButton";
import { useNotification } from "../../hooks/useNotification";
import { useDispatch, useSelector } from "react-redux";
import { deletePostById } from "./postSlice";

function PostActions({ setOpenModal, postId, likes }) {
  const [toggleLike, setToggleLike] = useState(false);
  const { currentUserData, isLoggedIn } = useAuthentication();
  const { status: isDeleting, result: deletingResult } = useSelector(
    (state) => state.post
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { notify } = useNotification();

  const token = Cookies.get("token");

  const handleToggleLike = async () => {
    if (isLoggedIn) {
      try {
        const res = await axios.post(
          `${BASE_URL}/posts/${postId}/likes`,
          { user: currentUserData?._id, post: postId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (res.status === 200) {
          setToggleLike(true);
        } else if (res.status === 204) {
          setToggleLike(false);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      navigate("/login");
    }
  };

  const handleDeletePost = useCallback(() => {
    dispatch(deletePostById(postId));

    if (deletingResult.statusCode === 204) {
      notify("success", deletingResult.message);
      navigate("/dashboard");
    } else {
      notify("error", deletingResult.message);
    }
  }, [
    dispatch,
    postId,
    deletingResult.statusCode,
    deletingResult.message,
    notify,
    navigate,
  ]);

  const handleOpenComment = () => {
    if (isLoggedIn) {
      setOpenModal(true);
    } else {
      navigate("/login");
      notify("error", "To send comment you have to login");
    }
  };

  useEffect(() => {
    const checkUserLiked = likes?.some((el) => el.user === currentUserData._id);
    if (checkUserLiked) {
      setToggleLike(true);
    } else {
      setToggleLike(false);
    }
  }, [currentUserData, likes]);

  return (
    <div
      className={`flex ${
        isLoggedIn && currentUserData?.role === "admin"
          ? "justify-between flex-col-reverse gap-3 sm:flex-row"
          : "justify-end"
      } items-center`}
    >
      {isLoggedIn && currentUserData?.role === "admin" ? (
        <div className="flex items-center justify-center gap-3 w-full">
          <LinkButton background="indigo" to={`/update-post/${postId}`}>
            Update
          </LinkButton>
          <LinkButton onClick={handleDeletePost} type="button" background="red">
            {isDeleting === "deleting" ? "Deleting..." : "Delete"}
          </LinkButton>
        </div>
      ) : (
        ""
      )}
      <div className="flex justify-end px-6 py-2 text-2xl sm:text-3xl text-stone-900 gap-1">
        <div>
          <button
            onClick={handleOpenComment}
            className="relative transition-all duration-500 w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"
          >
            <HiOutlineChatBubbleBottomCenterText />
            <span className="black absolute top-0 left-0 w-12 h-12 rounded-full"></span>
          </button>
        </div>
        <div>
          <button
            onClick={handleToggleLike}
            className={`relative transition-all duration-500 w-12 h-12 rounded-full ${
              toggleLike ? "bg-red-500" : "bg-gray-200"
            } flex items-center justify-center overflow-hidden`}
          >
            {toggleLike ? (
              <HiHeart className={`text-white z-[1] ${styles.shake}`} />
            ) : (
              <HiOutlineHeart className={styles.shake} />
            )}
            <span
              className={`black absolute top-0 left-0 w-12 h-12 rounded-full bg-red-500 ${
                toggleLike ? "scale-100" : "scale-0"
              } transition-all duration-500`}
            ></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostActions;
