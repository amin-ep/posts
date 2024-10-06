import { useParams } from "react-router-dom";
import PostActions from "../../features/post/PostActions";
import { useState, useEffect } from "react";
import Comments from "../../features/comments/Comments";
import PostDetails from "../../features/post/PostDetails";
import { getPostById } from "../../features/post/postSlice";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../ui/Container/Container";
import styles from "./Post.module.css";

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
    else document.body.style.overflowY = "scroll";
  }, [openModal]);

  return (
    <Container
      background="white"
      size="medium"
      extraClasses={`${styles["card-container"]} rounded-lg`}
    >
      <div className="flex items-center justify-center">
        <img
          src={`http://localhost:3000/static/posts/${post.image}`}
          alt={post.title}
          className="max-w-full max-h-full rounded-lg object-cover"
        />
      </div>
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
    </Container>
  );
}

export default Post;
