import React from "react";
import { Link } from "react-router-dom";

export const CommentList = ({ comment, username }) => {
  return (
    <div className="flex items-center justify-center px-5 py-5 mt-10">
      <div className="w-full mx-auto max-w-xl rounded-lg bg-white dark:bg-gray-800 shadow-lg px-5 pt-5 pb-10 text-gray-800 dark:text-gray-50">
        <div className="w-full pt-1 text-center pb-5 -mt-16 mx-auto">
          <Link to={`/profile/${comment.commentBy._id}`}>
            <img
              alt=""
              src={comment.commentBy.picture}
              className="object-cover rounded-full h-14 w-14 "
            />
          </Link>
          <div className="font-bold -mt-12 flex m-16">
            {comment.commentBy.username}
          </div>
          <div className="-mt-8 m-16 relative bottom-14">
            {new Date(comment.commentAt).toLocaleString({
              timeZone: "Asia/Tokyo",
            })}
            <div className="flex  text-sm">
              <p className="text-cyan-500 underline cursor-pointer">
                {username}
              </p>
              <p className="ml-2">へのコメント</p>
            </div>
          </div>
        </div>
        <div className="w-full mb-10">
          <p className=" -order-1 text-base text-black-600 -mt-12 m-24">
            {comment.comment}
          </p>
        </div>
        <div className="w-full">
          {comment.img ? (
            <div className="flex justify-center">
              <img className="h-60 " src={comment.img} alt="" />
            </div>
          ) : (
            <div></div>
          )}
          {/* {user?._id === post.user._id ? (
              <button
                onClick={onClickDelete}
                className="text-xs text-gray-500 dark:text-gray-300 text-center"
              >
                削除
              </button>
            ) : null} */}
        </div>
        <div className="flex justify-around  items-center"></div>
      </div>
    </div>
  );
};
