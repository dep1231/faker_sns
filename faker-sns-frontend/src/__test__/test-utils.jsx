/* eslint-disable testing-library/no-render-in-setup */
import { render as rtlRender } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/auth/authSlice";
import postReducer from "../slice/posts/postSlice";
import usersReducer from "../slice/users/usersSlice";
import commentReducer from "../slice/comment/commentSlice";
import { Provider } from "react-redux";
import App from "../App";
import { screen } from "@testing-library/react";

function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        auth: authReducer,
        post: postReducer,
        users: usersReducer,
        comment: commentReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}
export * from "@testing-library/react";

export { render };
