import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../../features/post/postSlice";
import PostCard from "../../features/post/PostCard";
import Spinner from "../../ui/Spinner/Spinner";
import Container from "../../ui/Container/Container";
import styles from "./Home.module.css";

function Home() {
  const { status, data: posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  const renderedPosts = useMemo(() => {
    return posts?.map((post) => (
      <PostCard
        image={post?.image}
        title={post?.title}
        description={post?.description}
        key={post?._id}
        likes={post?.likes}
        id={post?._id}
        comments={post?.comments}
      />
    ));
  }, [posts]);

  if (status === "loading")
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  else if (status === "idle")
    return (
      <Container
        size="large"
        extraClasses={`rounded-md ${styles["card-wrapper"]}`}
      >
        {renderedPosts}
      </Container>
    );
}

export default Home;
