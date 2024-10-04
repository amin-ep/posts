/* eslint-disable react/prop-types */
import { HiOutlineChatBubbleLeftEllipsis, HiHeart } from "react-icons/hi2";
import { Link } from "react-router-dom";

function PostCard({ image, title, description, likes, comments, id }) {
  return (
    <div className="flex flex-col gap-3 rounded-md bg-white shadow-xl">
      <img
        src={`http://localhost:3000/static/posts/${image}`}
        alt={title}
        className="rounded-t-md w-full h-44 object-cover object-center border-b-blue-600 border-b-[5px]"
      />
      <div className="flex items-center justify-evenly">
        <span className="flex items-center gap-1">
          <HiOutlineChatBubbleLeftEllipsis size={33} />
          {comments?.length}
        </span>
        <span className="flex items-center gap-1">
          <HiHeart size={33} />
          {likes?.length}
        </span>
      </div>

      <div className="text-left p-4 flex-1">
        <h1 className="text-stone-900 text-3xl font-semibold">{title}</h1>
        <p className="ml-3 text-stone-900">
          {description.length > 80
            ? description.slice(0, 80) + "..."
            : description}
        </p>
      </div>
      <div className="flex items-center justify-center py-4">
        <Link
          to={`/post/${id}`}
          className="bg-blue-600 text-white px-5 py-3 rounded-md hover:shadow-2xl transition-all hover:bg-blue-700"
        >
          View More
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
