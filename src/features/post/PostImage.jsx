/* eslint-disable react/prop-types */
import styled from "styled-components";
import { HiOutlineHeart, HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

const StyledDiv = styled.div`
  color: var(--color-gray-900);
  display: flex;
`;

function PostImage({ title, image, likeQuantity, commentQuantity }) {
  return (
    <div className="flex items-baseline justify-center relative">
      <section
        id="post-info"
        className="flex justify-start absolute left-3 top-3 bg-white rounded-md p-1 w-24 items-center gap-2"
      >
        <StyledDiv>
          <HiOutlineChatBubbleLeftRight size={25} />
          <span>{commentQuantity}</span>
        </StyledDiv>
        <StyledDiv>
          <HiOutlineHeart size={25} />
          <span>{likeQuantity}</span>
        </StyledDiv>
      </section>
      <img
        src={`http://localhost:3000/static/posts/${image}`}
        alt={title}
        className="max-w-full max-h-full rounded-lg object-cover"
      />
    </div>
  );
}

export default PostImage;
