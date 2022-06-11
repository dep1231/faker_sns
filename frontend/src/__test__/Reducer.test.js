import { start } from "repl";
import usersReducer, { getUsers } from "../redux/slice/users/usersSlice";

// describe("user reducer", () => {
//   describe("ユーザー情報を取得する", () => {
//     const initialState = {
//       users: [],
//       isError: false,
//       isSuccess: false,
//       isLoading: false,
//       message: "",
//     };
//     it("ユーザー情報を取得する", () => {
//       const action = {
//         type: "users/getUsers",
//       };
//     });
//   });
// });

describe("extraReducer", () => {
  const initialState = {
    users: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  };
  it("fulfilled", () => {
    const action = {
      type: "users/getUsers/fulfilled",
      payload: [],
    };
    const state = getUsers(initialState, action);
    expect(state).toEqual({
      users: [],
      isError: false,
      isSuccess: true,
      isLoading: false,
      message: "",
    });
  });
});
