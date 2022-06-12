import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { InputPost } from "../../components/input/InputPost";
import { getAllPosts } from "../../redux/slice/posts/postSlice";
import { reset } from "../../redux/slice/auth/authSlice";
import { DataPost } from "../../components/posts/DataPost";
import { Spinner } from "../../components/spinner/Spinner";

export const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { posts, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <div>
      {isLoading ? <Spinner /> : null}
      {user ? (
        <InputPost inputText="投稿する" dispatchText="createPost" />
      ) : null}
      {posts.map((post) => (
        <DataPost key={post._id} post={post} user={post.user} />
      ))}
      {}
    </div>
  );
};
