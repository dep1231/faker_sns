import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentService from "./commentService";

const initialState = {
  comments: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// コメントの取得

export const getPostFind = createAsyncThunk(
  "comment/getPostFind",
  async (postId, thunkAPI) => {
    try {
      return await commentService.getPostFind(postId);
    } catch (error) {
      const message =
        (error.res && error.res.data && error.res.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// コメントの投稿

export const createComment = createAsyncThunk(
  "comment/createComment",
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await commentService.createComment(postData, token);
    } catch (error) {
      const message =
        (error.res && error.res.data && error.res.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // 投稿の取得
      .addCase(getPostFind.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPostFind.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.comments = action.payload;
      })
      .addCase(getPostFind.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // コメントの投稿
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.comments = action.payload;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { commentReset } = commentSlice.actions;

export default commentSlice.reducer;
