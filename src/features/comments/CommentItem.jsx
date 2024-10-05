/* eslint-disable react/prop-types */

import { formatDate } from "../../utils/helpers";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import CommentItemsAction from "./CommentItemsAction";
import { useState } from "react";
import CommentItemReply from "./CommentItemReply";

function CommentItem({
  username,
  createdAt,
  content,
  profile,
  id,
  setReplyTo,
  replies,
}) {
  const [openReplies, setOpenReplies] = useState(false);

  return (
    <div className="grid grid-cols-[56px_auto] rounded-lg shadow-lg shadow-black/30 md:shadow-transparent bg-white p-2 md:bg-transparent md:grid-cols-[130px_auto] gap-2 my-4">
      <img
        src={`http://localhost:3000/static/users/${profile}`}
        alt={username}
        className="w-14 h-14 md:w-24 md:h-24 object-cover rounded-full"
      />
      <div className="text-gray-700 flex flex-col">
        <div className="flex justify-between items-center">
          <h2 className="text-xl">{username}</h2>
          <p className="italic hidden items-center gap-2 md:flex">
            {formatDate(createdAt)}
            <span className="text-2xl">
              <HiOutlineCalendarDays />
            </span>
          </p>
        </div>
        <div className="md:p-4 flex flex-col text-gray-700 justify-between bg-white md:shadow-lg md:shadow-black/30 min-h-40 rounded-md relative">
          <div className="px-4 pt-2 pb-8">
            {content.split("\n").map((text, index) => (
              <p key={index}>
                {text}
                <br />
              </p>
            ))}
          </div>
          <CommentItemsAction
            id={id}
            replies={replies}
            setReplyTo={setReplyTo}
            setOpenReplies={setOpenReplies}
            openReplies={openReplies}
            createdAt={createdAt}
          />
          {openReplies && (
            <div className="flex flex-col gap-3 mt-10">
              {replies?.map((reply) => (
                <CommentItemReply
                  key={reply?._id}
                  createdAt={reply?.createdAt}
                  image={reply?.user.image}
                  username={reply?.user.username}
                  content={reply?.text}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
