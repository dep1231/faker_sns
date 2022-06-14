import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUsers } from "../../redux/slice/users/usersSlice";
import { useParams } from "react-router-dom";
import { uploadImages } from "../../functions/upload";
import { getAllPosts } from "../../redux/slice/posts/postSlice";

export const UpdateCoverModal = () => {
  const [fileValue, setFileValue] = useState();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);
  const [modalOpen, setModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cover: users?.cover,
    },
    criteriaMode: "all",
    shouldFocusError: false,
  });

  const onSubmit = (req) => {
    console.log(req);
    const postData = {
      userId: user._id,
      ...req,
    };
    console.log(postData);
    try {
      if (req.files.length > 0) {
        uploadImages(req.files).then((res) => {
          const postData = {
            userId: user._id,
            cover: res[0].url,
          };
          console.log(postData);
          dispatch(updateUsers(postData)).catch((err) => console.log(err));
          dispatch(getAllPosts());
        });
      } else {
        dispatch(updateUsers(postData));
        dispatch(getAllPosts());
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
        背景画像編集
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
                    <h3 className="text-3xl font-semibold">背景画像編集</h3>
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
                      <div className="h-48 bg-slate-200">
                        <label htmlFor="getCover">
                          <img
                            src={users?.cover}
                            alt=""
                            className="h-48 w-full object-cover hover:opacity cursor-pointer"
                          />
                        </label>
                        <input
                          type="file"
                          id="getCover"
                          onChange={(e) => {
                            setFileValue(e.target.files[0]);
                          }}
                          {...register("files")}
                          className="hidden"
                        />
                      </div>
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
