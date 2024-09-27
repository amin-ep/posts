import { useParams } from "react-router-dom";
import PostActions from "./PostActions";
import { useState, useCallback, useEffect } from "react";
import { BASE_URL } from "../../utils/helpers";
import { formatDate } from "../../utils/helpers";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import styled from "styled-components";
import Comments from "../comments/Comments";

function Post() {
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { id } = useParams();

  const getPost = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/posts/${id}`);
      const data = await res.json();

      if (data.status === "success") {
        setPost(data.data.doc);
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(
    function () {
      getPost();
    },
    [getPost]
  );

  useEffect(() => {
    if (openModal) document.body.style.overflowY = "hidden";
  }, [openModal]);

  const StyledDiv = styled.div`
    background: #ffffffe6;
    height: max-content;
    padding: 1.2rem;
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
        className="h-[245px] object-cover rounded-md sm:h-[355px] md:h-[400px] lg:h-[500px]"
      />
      <div className="flex flex-col gap-5 text-stone-900">
        <div className="px-6 py-7 border-b-[1px] border-gray-300">
          <div className="flex flex-col-reverse gap-5 sm:flex-row justify-between items-center">
            <h1 className="text-2xl sm:text-5xl">
              {isLoading ? "Loading..." : post.title}
            </h1>
            <div className="flex items-center gap-2">
              <p>{formatDate(post.createdAt)}</p>
              <HiOutlineCalendarDays size={22} />
            </div>
          </div>
          <p className="text-base text-center sm:text-left sm:text-lg leading-7 mt-6">
            {isLoading ? (
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
                className="text-teal-400 hover:text-teal-500"
                onClick={() => setShowMore((s) => !s)}
              >
                {!showMore ? " show more" : " show less"}
              </button>
            )}
          </p>
        </div>
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
