import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../../components/spinner/Spinner";

import { CommentList } from "../../components/posts/CommentList";
import { getPostFind } from "../../redux/slice/comment/commentSlice";
import { InputPost } from "../../components/input/InputPost";
import { InputComment } from "../../components/input/inputComment";

export const FindPost = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { comments, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.comment
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getPostFind(params.id));
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="flex items-center justify-center px-5 py-5 mt-10">
        <div className="w-full mx-auto max-w-xl rounded-lg bg-white dark:bg-gray-800 shadow-lg px-5 pt-5 pb-10 text-gray-800 dark:text-gray-50">
          <div className="w-full pt-1 text-center pb-5 -mt-16 mx-auto">
            <Link to={`/profile/${comments?.user?._id}`}>
              <img
                alt=""
                src={comments?.user?.picture}
                className="object-cover rounded-full h-14 w-14 "
              />
            </Link>
            <div className="font-bold -mt-12 flex m-16">
              {comments?.user?.username}
            </div>
            <div className="-mt-16 flex m-16">
              {new Date(comments?.createdAt).toLocaleString({
                timeZone: "Asia/Tokyo",
              })}
            </div>
          </div>
          <div className="w-full mb-10">
            <p className=" -order-1 text-base text-black-600 -mt-12 m-24">
              {comments?.desc}
            </p>
          </div>
          <div className="w-full">
            {comments?.img ? (
              <div className="flex justify-center">
                <img className="h-60 " src={comments?.img} alt="" />
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="flex justify-around  items-center"></div>
        </div>
      </div>
      {user ? <InputComment inputText="コメントを投稿する" /> : null}
      {comments?.comments?.map((comment) => (
        <CommentList
          key={comment._id}
          comment={comment}
          username={comments.user.username}
        />
      ))}
    </>
  );
};
