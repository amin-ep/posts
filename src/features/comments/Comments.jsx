/* eslint-disable react/prop-types */
import ReactModal from "react-modal";
import { IoMdClose } from "react-icons/io";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchGetCommentsOnPost } from "./commentSlice";

ReactModal.setAppElement("#comments");

function Comments({ openModal, onClick, postId }) {
  const [replyTo, setReplyTo] = useState("");
  const comments = useSelector((state) => state.comment.data);

  const dispatch = useDispatch();

  const styles = {
    content: {
      bottom: "0",
      left: "0",
      right: "0",
      top: "100px",
      borderRadius: "15px 15px 0 0",
      background: "#f3f4f6",
      border: "none",
      overflow: "hidden",
      zIndex: 1001,
      // position: "relative",
    },
    overlay: {
      background: "#00000094",
      backdropFilter: "blur(4px)",
      zIndex: 1000,
    },
  };

  useEffect(() => {
    if (postId) {
      dispatch(fetchGetCommentsOnPost(postId));
    }
  }, [dispatch, postId]);

  return (
    <ReactModal
      isOpen={openModal}
      onRequestClose={onClick}
      style={styles}
      shouldCloseOnOverlayClick={true}
    >
      <header
        id="header"
        className="flex justify-between text-stone-900 text-2xl border-b-2 border-stone-200 pb-5"
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
        <CommentForm postId={postId} replyTo={replyTo} />
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
                setReplyTo={setReplyTo}
                id={comment?._id}
                replies={comment?.replies}
                replyTo={replyTo}
              />
            ))}
        </div>
      </div>
    </ReactModal>
  );
}

export default Comments;
