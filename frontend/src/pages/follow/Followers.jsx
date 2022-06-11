import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FollowersList } from "../../components/follow/FollowersList";
import { getFollowers, reset } from "../../redux/slice/users/usersSlice";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const Followers = () => {
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    dispatch(getFollowers(params.id));
    return () => {
      dispatch(reset());
    };
  }, []);
  return (
    <>
      <div className="flex items-center justify-around">
        <div className="flex justify-between items-center">
          <div className="mr-32">
            <button
              type="button"
              className="border  border-gray-700 bg-gray-700 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-800 focus:outline-none focus:shadow-outline"
            >
              フォロワー
            </button>
          </div>
          <Link to={`/followings/${params.id}`}>
            <button
              type="button"
              className="border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
            >
              フォロー中
            </button>
          </Link>
        </div>
      </div>
      {users?.followers?.map((user) => (
        <FollowersList key={user._id} user={user} />
      ))}
    </>
  );
};
