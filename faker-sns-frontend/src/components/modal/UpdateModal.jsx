import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUsers } from "../../redux/slice/users/usersSlice";
import { useParams } from "react-router-dom";
import { uploadImages } from "../../functions/upload";

export const UpdateModal = () => {
  const [fileValue, setFileValue] = useState();
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);
  const [modalOpen, setModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      picture: user?.picture,
      username: user?.username,
      profile: user?.profile,
    },
    criteriaMode: "all",
    shouldFocusError: false,
  });

  const onSubmit = (req) => {
    const postData = {
      userId: user._id,
      ...req,
    };
    console.log(req);
    try {
      if (req.files) {
        uploadImages(req.files).then((res) => {
          const postData = {
            userId: user._id,
            picture: res[0].url,
            username: req.username,
            profile: req.profile,
          };
          console.log(postData);
          dispatch(updateUsers(postData)).catch((err) => console.log(err));
        });
      } else {
        dispatch(updateUsers(postData));
      }
      // if (isLoading) {
      //   return <Spinner />;
      // }
      setModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="border border-gray-400  text-gray-700 rounded-md px-4 py-2  transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
      >
        編集
      </button>
      {modalOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-1/2 my-6 mx-auto max-w-7xl">
              {/*content*/}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">プロフィール編集</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setModalOpen(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <div className="mb-4">
                      <div className="flex justify-center">
                        <label htmlFor="getFile">
                          <img
                            alt=""
                            className="h-32 rounded-full"
                            src={users?.picture}
                          />
                        </label>
                        <input
                          type="file"
                          id="getFile"
                          onChange={(e) => {
                            setFileValue(e.target.files[0]);
                          }}
                          {...register("files")}
                          className="hidden"
                        />
                      </div>
                      <label className="block mb-1">ユーザーネーム</label>
                      <input
                        type="text"
                        {...register("username", { required: true })}
                        className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-1">自己紹介</label>
                      <input
                        type="text"
                        {...register("profile")}
                        className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                      />
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setModalOpen(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};
