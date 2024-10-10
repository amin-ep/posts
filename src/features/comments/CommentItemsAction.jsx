/* eslint-disable react/prop-types */
import { VscReply } from "react-icons/vsc";
import { formatDate } from "../../utils/helpers";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { useSelector } from "react-redux";

function CommentItemsAction({
  replies,
  id,
  setReplyTarget,
  setOpenReplies,
  openReplies,
  createdAt,
}) {
  const allComments = useSelector((state) => state.comment.data);

  const handleReply = () => {
    setReplyTarget(id);

    const targetCommentUsername = allComments.find((el) => el._id === id).user
      .username;

    if (window.screen.availWidth >= 640) {
      const topCommentInput = document.getElementById("comment");
      topCommentInput.scrollIntoView({ behavior: "smooth" });
      topCommentInput.placeholder = `Reply to ${targetCommentUsername} ...`;
    } else {
      const fixedBottomCommentInput = document.getElementById(
        "fixed-comment-input"
      );

      fixedBottomCommentInput.focus();
      fixedBottomCommentInput.placeholder = `Reply to ${targetCommentUsername} ...`;
    }
  };

  return (
    <div className="flex flex-col items-end justify-end gap-3">
      <div className="flex items-center justify-end gap-5">
        {replies?.length > 0 && (
          <button
            type="button"
            className="flex items-center justify-center"
            onClick={() => setOpenReplies((r) => !r)}
          >
            {openReplies === false ? (
              <>
                {replies?.slice(0, 3).map((reply) => (
                  <img
                    src={`http://localhost:3000/static/users/${reply.user.image}`}
                    alt={reply.user.username}
                    className={`w-8 h-8 rounded-full object-cover outline outline-2 outline-white ${
                      replies.length > 1 && "-ml-3"
                    }`}
                    key={reply._id}
                  />
                ))}
              </>
            ) : (
              "Close replies"
            )}
          </button>
        )}
        <button type="button" onClick={handleReply}>
          <VscReply />
        </button>
      </div>

      <div className="block md:hidden">
        <p className="italic flex items-center gap-2 text-gray-800">
          {formatDate(createdAt)}
          <span className="text-lg">
            <HiOutlineCalendarDays />
          </span>
        </p>
      </div>
    </div>
  );
}

export default CommentItemsAction;
