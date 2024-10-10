/* eslint-disable react/prop-types */
import ReactModal from "react-modal";
import { IoMdClose } from "react-icons/io";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchGetCommentsOnPost } from "./commentSlice";
import styles from "./Comments.module.css";

ReactModal.setAppElement("#comments");

function Comments({ openModal, onClick, postId }) {
  const [replyTarget, setReplyTarget] = useState("");
  const comments = useSelector((state) => state.comment.data);

  const dispatch = useDispatch();

  useEffect(() => {
    if (postId) {
      dispatch(fetchGetCommentsOnPost(postId));
    }
  }, [dispatch, postId]);

  return (
    <ReactModal
      isOpen={openModal}
      onRequestClose={onClick}
      shouldCloseOnOverlayClick={true}
      className={openModal ? styles.content : styles["closing-content"]}
      overlayClassName={styles.overlay}
    >
      <header
        id="header"
        className="flex justify-between text-gray-800 text-2xl border-b-2 items-center p-5 border-stone-200 pb-5"
      >
        <h1>
          Comments (
          {comments?.filter((c) => c.parentComment === undefined).length})
        </h1>
        <button onClick={onClick}>
          <IoMdClose />
        </button>
      </header>
      <div className="overflow-y-scroll h-full pb-20 px-2 md:px-14 z-[10]">
        <CommentForm postId={postId} replyTarget={replyTarget} />
        <div className="my-7">
          {comments
            ?.filter((c) => c.parentComment === undefined)
            .map((comment) => (
              <CommentItem
                username={comment?.user.username}
                key={comment?._id}
                content={comment?.text}
                createdAt={comment?.createdAt}
                profile={comment?.user.image}
                setReplyTarget={setReplyTarget}
                id={comment?._id}
                replies={comment?.replies}
                replyTarget={replyTarget}
              />
            ))}
        </div>
      </div>
    </ReactModal>
  );
}

export default Comments;
