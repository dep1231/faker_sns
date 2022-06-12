import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersService from "./usersService";

const initialState = {
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// ユーザの取得
export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (userId, thunkAPI) => {
    try {
      return await usersService.getUsers(userId);
    } catch (error) {
      const message =
        (error.res && error.res.data && error.res.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// ユーザー更新
export const updateUsers = createAsyncThunk(
  "users/updateUsers",
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await usersService.updateUsers(postData, token);
    } catch (error) {
      const message =
        (error.res && error.res.data && error.res.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// フォローする
export const pushFollow = createAsyncThunk(
  "users/pushFollow",
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await usersService.pushFollow(postId, token);
    } catch (error) {
      const message =
        (error.res && error.res.data && error.res.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// フォローを外す
export const pullFollow = createAsyncThunk(
  "users/pullFollow",
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await usersService.pullFollow(postId, token);
    } catch (error) {
      const message =
        (error.res && error.res.data && error.res.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// フォロワーの取得
export const getFollowers = createAsyncThunk(
  "users/getFollowers",
  async (paramsId, thunkAPI) => {
    try {
      return await usersService.getFollowers(paramsId);
    } catch (error) {
      const message =
        (error.res && error.res.data && error.res.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// フォローしている人の取得
export const getFollowings = createAsyncThunk(
  "users/getFollowings",
  async (paramsId, thunkAPI) => {
    try {
      return await usersService.getFollowings(paramsId);
    } catch (error) {
      const message =
        (error.res && error.res.data && error.res.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // ユーザの取得
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // ユーザー更新
      .addCase(updateUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.users = { ...state.users, ...action.payload };
      })
      .addCase(updateUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // フォローする
      .addCase(pushFollow.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(pushFollow.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.users.followings.push(action.payload);
      })
      .addCase(pushFollow.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // フォロー解除する
      .addCase(pullFollow.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(pullFollow.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.users.followings.pop(action.payload);
      })
      .addCase(pullFollow.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // フォロワーの取得
      .addCase(getFollowers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFollowers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.users = action.payload;
      })
      .addCase(getFollowers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // フォローしている人の取得
      .addCase(getFollowings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFollowings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.users = action.payload;
      })
      .addCase(getFollowings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = usersSlice.actions;

export default usersSlice.reducer;
