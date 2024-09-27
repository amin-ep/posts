/* eslint-disable react/prop-types */
import { formatDate } from "../../utils/helpers";

function CommentItemReply({ image, username, createdAt, content }) {
  return (
    <div className="bg-gray-200 grid p-3 w-[50rem] mx-auto rounded-lg max-w-[95%]">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src={`http://localhost:3000/static/users/${image}`}
            alt={username}
            className="w-10 h-10 md:w-12 md:h-12 object-center object-cover rounded-full"
          />
          <p>{username}</p>
        </div>
        <p>{formatDate(createdAt)}</p>
      </div>
      <div className="w-[90%] mt-7 mx-auto">
        {content.split("\n").map((text, index) => (
          <p key={index}>
            {text}
            <br />
          </p>
        ))}
      </div>
    </div>
  );
}

export default CommentItemReply;
