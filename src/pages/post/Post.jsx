import { useParams } from "react-router-dom";
import PostActions from "../../features/post/PostActions";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Comments from "../../features/comments/Comments";
import PostDetails from "../../features/post/PostDetails";
import { getPostById } from "../../features/post/postSlice";
import { useDispatch, useSelector } from "react-redux";

function Post() {
  const [openModal, setOpenModal] = useState(false);
  const { post, status: isLoading } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getPostById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (openModal) document.body.style.overflowY = "hidden";
  }, [openModal]);

  const StyledDiv = styled.div`
    background: #ffffffe6;
    height: max-content;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    width: 55rem;
    max-width: 100%;
    box-shadow: 0 10px 16px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    position: relative;
  `;

  return (
    <StyledDiv>
      <img
        src={`http://localhost:3000/static/posts/${post.image}`}
        alt={post.title}
        className="h-[245px] object-cover rounded-md sm:h-[335px] md:h-[380px] lg:h-[400px]"
      />
      <div className="flex flex-col gap-5 text-stone-900">
        <PostDetails isLoading={isLoading} post={post} />
        <PostActions
          setOpenModal={setOpenModal}
          postId={post?._id}
          likes={post?.likes}
        />
        <div className="z-50">
          <Comments
            postId={post._id}
            openModal={openModal}
            onClick={() => setOpenModal(false)}
          />
        </div>
      </div>
    </StyledDiv>
  );
}

export default Post;
