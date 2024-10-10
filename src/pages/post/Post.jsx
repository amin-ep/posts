import { useParams } from "react-router-dom";
import PostActions from "../../features/post/PostActions";
import { useState, useEffect } from "react";
import Comments from "../../features/comments/Comments";
import PostDetails from "../../features/post/PostDetails";
import { getPostById } from "../../features/post/postSlice";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../ui/Container/Container";
import styles from "./Post.module.css";
import PostImage from "../../features/post/PostImage";

function Post() {
  const [openModal, setOpenModal] = useState(false);
  const { post, status: isLoading } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getPostById(id));
  }, [id, dispatch]);

  return (
    <Container
      background="white"
      size="medium"
      extraClasses={`${styles["card-container"]} rounded-lg`}
    >
      <PostImage
        title={post?.title}
        image={post?.image}
        likeQuantity={post?.likes?.length}
        commentQuantity={post?.comments?.length}
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
    </Container>
  );
}

export default Post;
