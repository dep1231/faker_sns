import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authLogin, reset } from "../../redux/slice/auth/authSlice";
import { Spinner } from "../../components/spinner/Spinner";
import { Link } from "react-router-dom";

// type Input = {
//   email: string;
//   password: string;
// };

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  // <Input>
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
    shouldFocusError: false,
  });

  // : SubmitHandler<Input>
  const onSubmit = (req) => {
    try {
      const user = {
        email: req.email,
        password: req.password,
      };
      dispatch(authLogin(user));
      if (isLoading) {
        return <Spinner />;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
      <div className="w-full mb-50 sm:max-w-md p-5 mx-auto">
        <h2 className="mb-12 text-center text-5xl font-extrabold">Welcome.</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block mb-1">Email-Address</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
            />
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center"></div>
            <Link to="/" className="text-sm">
              Forgot your password?
            </Link>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition"
            >
              Sign In
            </button>
          </div>
          <div className="mt-6 text-center">
            <Link to="/register" className="underline">
              Sign up for an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
