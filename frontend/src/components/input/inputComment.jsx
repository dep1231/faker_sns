import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { createPost, uploadImage } from "../../redux/slice/posts/postSlice";
import { AiFillPicture } from "react-icons/ai";
import { uploadImages } from "../../functions/upload";
import { createComment } from "../../redux/slice/comment/commentSlice";

export const InputComment = ({ inputText }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { post } = useSelector((state) => state.post);
  const { comments } = useSelector((state) => state.comment);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
    shouldFocusError: false,
  });
  console.log(comments._id);
  const onSubmit = (req) => {
    try {
      const postData = {
        postId: comments._id,
        userId: user._id,
        comment: req.comment,
      };
      console.log(postData);
      // fileがあればcloudinaryに画像をアップロードする
      if (req.files.length > 0) {
        uploadImages(req.files).then((res) => {
          const postData = {
            postId: comments._id,
            userId: user._id,
            comment: req.comment,
            img: res[0].url,
          };
          dispatch(
            createComment({
              postData,
            })
          ).catch((err) => console.log(err));
        });
      } else {
        dispatch(
          createComment({
            postData,
          })
        );
      }
    } catch (error) {}
  };
  return (
    <div className="flex-1 bg-gray-50 max-w-2xl mx-auto">
      <div></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="sr-only">{inputText}</label>
        <div className="flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700">
          <label
            htmlFor="getImage"
            className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
          >
            <AiFillPicture size={25} />
          </label>
          <input
            type="file"
            id="getImage"
            className="hidden"
            {...register("files")}
          />
          <button
            type="submit"
            className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"></path>
            </svg>
          </button>
          <input
            type="text"
            {...register("comment", { required: true })}
            className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={inputText}
          ></input>
          <button
            type="submit"
            className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
          >
            <svg
              className="w-6 h-6 rotate-90"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};
