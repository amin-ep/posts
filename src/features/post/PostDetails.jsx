/* eslint-disable react/prop-types */
import { formatDate } from "../../utils/helpers";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { useState } from "react";

function PostDetails({ isLoading, post }) {
  const [showMore, setShowMore] = useState(false);
  return (
    <>
      <div className="px-6 py-7 border-b-[1px] border-gray-300">
        <div className="flex flex-col-reverse sm:flex-row justify-between items-center">
          <h1 className="text-2xl sm:text-4xl text-gray-800 break-words font-semibold">
            {isLoading === "loading" ? "Loading..." : post.title}
          </h1>
          <div className="flex items-center gap-1 justify-end">
            <p className="text-gray-700">{formatDate(post.createdAt)}</p>
            <HiOutlineCalendarDays size={22} />
          </div>
        </div>
        <p className="text-base text-center sm:text-left sm:text-lg leading-7 mt-6 text-gray-700">
          {isLoading === "loading" ? (
            "Loading..."
          ) : (
            <>
              {post?.description?.length > 120
                ? !showMore
                  ? post.description?.slice(0, 120) + "...  "
                  : post.description + "       "
                : post?.description}
            </>
          )}
          {post?.description?.length > 120 && (
            <button
              className="text-indigo-700 hover:text-indigo-900"
              onClick={() => setShowMore((s) => !s)}
            >
              {!showMore ? " show more" : " show less"}
            </button>
          )}
        </p>
      </div>
    </>
  );
}

export default PostDetails;
