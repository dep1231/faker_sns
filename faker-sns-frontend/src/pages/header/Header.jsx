import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import "../../index.css";
import { Link, Outlet } from "react-router-dom";
import { reset, logout } from "../../redux/slice/auth/authSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="h-24 w-full flex justify-between bg-blue-50 ">
        <div className="h-full w-16 py-8 ml-8">
          <Link to="/">
            <AiOutlineHome size={40} />
          </Link>
        </div>
        <div className="w-1/2 h-full flex items-center justify-end">
          {user ? (
            <>
              <div className="py-4 cursor-pointer mr-8">
                <Link to={"/profile/" + user._id}>
                  <h3>プロフィールへ</h3>
                </Link>
              </div>
              <div className="py-4 cursor-pointer mr-8">
                <button
                  onClick={onLogout}
                  className="border border-teal-500 bg-teal-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-teal-600 focus:outline-none focus:shadow-outline"
                >
                  ログアウト
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="py-4 cursor-pointer mr-2">
                <Link to="/register">
                  <button className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline">
                    新規登録
                  </button>
                </Link>
              </div>
              <div className="py-4 cursor-pointer mr-4">
                <Link to="/login">
                  <button className="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline">
                    ログイン
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
};
