import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/auth/authSlice";
import postReducer from "../slice/posts/postSlice";
import usersReducer from "../slice/users/usersSlice";
import commentReducer from "../slice/comment/commentSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    users: usersReducer,
    comment: commentReducer,
  },
});

export default store;
