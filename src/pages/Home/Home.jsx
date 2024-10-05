import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../../features/post/postSlice";
import PostCard from "../../features/post/PostCard";
import Spinner from "../../ui/Spinner/Spinner";
import Container from "../../ui/Container/Container";
import styles from "./Home.module.css";
import Pagination from "../../ui/Pagination/Pagination";

function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    status,
    data: posts,
    totalPages,
  } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPosts(currentPage));
  }, [dispatch, currentPage]);

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
      <>
        <Container
          size="extra-large"
          extraClasses={`rounded-md ${styles["card-wrapper"]}`}
        >
          {renderedPosts}
        </Container>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </>
    );
}

export default Home;
