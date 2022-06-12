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
        <div className="m-auto  w-full max-w-3xl items-center justify-center overflow-hidden rounded-2xl shadow-xl">
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
          <div className="flex items-center justify-start">
            <Link to={"/followings/" + params?.id}>
              <p className=" ml-10 mb-7 text-bold cursor-pointer">
                {Array.isArray(users?.followings) ? users.followings.length : 0}
                フォロー中
              </p>
            </Link>
            <Link to={"/followers/" + params?.id}>
              <p className=" ml-10 mb-7 text-bold cursor-pointer">
                {Array.isArray(users?.followers) ? users?.followers.length : 0}
                フォロワー
              </p>
            </Link>
            {user?._id !== users?._id ? (
              <>
                {users?.followings?.includes(user?._id) ? (
                  <button className="flex ml-60" onClick={onClickUnfollow}>
                    フォロー解除
                  </button>
                ) : (
                  <button className="flex ml-60" onClick={onClickFollow}>
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
