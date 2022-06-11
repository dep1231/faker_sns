import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export const FollowersList = (user) => {
  return (
    <>
      <div className="flex items-center justify-center px-5 py-5 mt-10">
        <div className="w-full mx-auto max-w-xl rounded-lg bg-white dark:bg-gray-800 shadow-lg px-5 pt-5 pb-10 text-gray-800 dark:text-gray-50">
          <div className="w-full pt-1 text-center pb-5 -mt-16 mx-auto">
            <Link to={`/profile/${user.user._id}`}>
              <img
                alt=""
                src={user.user.picture}
                className="object-cover rounded-full h-14 w-14 "
              />
            </Link>
            <div className="font-bold -mt-12 flex m-16">
              {user.user.username}
            </div>
            <div className="-mt-16 flex m-16"></div>
          </div>
          <div className="w-full mb-10">
            <p className=" -order-1 text-base text-black-600 -mt-12 m-24">
              {user.user.desc}
            </p>
          </div>
          <div className="w-full"></div>
        </div>
      </div>
    </>
  );
};
