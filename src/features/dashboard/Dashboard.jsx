import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../post/postSlice";
import PostCard from "../post/PostCard";
import Spinner from "../../ui/Spinner/Spinner";

function Dashboard() {
  const { status, data: posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  if (status === "loading")
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  else if (status === "idle")
    return (
      // sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {posts?.map((post) => (
          <PostCard
            image={post?.image}
            title={post?.title}
            description={post?.description}
            key={post?._id}
            likes={post?.likes}
            id={post?._id}
            comments={post?.comments}
          />
        ))}
      </div>
    );
}

export default Dashboard;
