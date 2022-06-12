import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts, reset } from "../../redux/slice/posts/postSlice";
import { Spinner } from "../../components/spinner/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { DataPost } from "../../components/posts/DataPost";
import {
  getUsers,
  pullFollow,
  pushFollow,
} from "../../redux/slice/users/usersSlice";
import { Link } from "react-router-dom";
import { UpdateModal } from "../../components/modal/UpdateModal";

export const Profile = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const { posts, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.post
  );
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getUsers(params.id));
    dispatch(getPosts(params.id));
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  const onClickFollow = () => {
    dispatch(pushFollow({ userId: user._id, paramsId: params.id }));
  };
  const onClickUnfollow = () => {
    dispatch(pullFollow({ userId: user._id, paramsId: params.id }));
  };

  return (
    <div>
      <div className="container max-w-full ">
        <div className="m-auto  w-full max-w-xl items-center justify-center overflow-hidden rounded-2xl shadow-xl">
          <div className="h-48 bg-slate-200">
            <img
              src={users?.cover}
              alt=""
              className="h-48 w-full object-cover"
            />
          </div>
          <div className="-mt-20 flex justify-center">
            <img alt="" className="h-32 rounded-full" src={users?.picture} />
          </div>
          <div className="flex justify-center items-center  mt-5 mb-1 px-3 text-center text-lg">
            {users?.username}
          </div>
          <div className="relative bottom-12 flex justify-end items-stretch mr-10 mb-10">
            {user?._id === users?._id ? <UpdateModal /> : null}
          </div>
          <div className="mb-5 px-3 text-center text-sky-500">
            {users?.profile}
          </div>
          <div className="flex container items-center justify-start">
            <Link to={"/followings/" + params?.id}>
              <p className=" ml-4 mb-7 text-bold cursor-pointer">
                {Array.isArray(users?.followings) ? users.followings.length : 0}
                フォロー中
              </p>
            </Link>
            <Link to={"/followers/" + params?.id}>
              <p className=" ml-8 mb-7 text-bold cursor-pointer">
                {Array.isArray(users?.followers) ? users?.followers.length : 0}
                フォロワー
              </p>
            </Link>
            {user?._id !== users?._id && user?._id ? (
              <>
                {users?.followings?.includes(user?._id) ? (
                  <button
                    className="flex ml-48 relative bottom-3 border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
                    onClick={onClickUnfollow}
                  >
                    フォロー解除
                  </button>
                ) : (
                  <button
                    className="flex ml-48 relative bottom-3 border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
                    onClick={onClickFollow}
                  >
                    フォロー
                  </button>
                )}{" "}
              </>
            ) : null}
          </div>
        </div>
        {posts.map((post) => (
          <DataPost key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};
