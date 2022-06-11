import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

const initialState = {
  posts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// 投稿機能

export const createPost = createAsyncThunk(
  "post/create",
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.createPost(postData, token);
    } catch (error) {
      const message =
        (error.res && error.res.data && error.res.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 画像の投稿
export const uploadImage = createAsyncThunk(
  "post/image",
  async (postData, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token;
      return await postService.uploadImage(postData);
    } catch (error) {
      const message =
        (error.res && error.res.data && error.res.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 自分の投稿データの取得
export const getPosts = createAsyncThunk(
  "post/getAll",
  async (userId, thunkAPI) => {
    try {
      return await postService.getPosts(userId);
    } catch (error) {
      const message =
        (error.res && error.res.data && error.res.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 全ての投稿の取得

export const getAllPosts = createAsyncThunk(
  "post/getAllPosts",
  async (thunkAPI) => {
    try {
      return await postService.getAllPosts();
    } catch (error) {
      const message =
        (error.res && error.res.data && error.res.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 投稿の更新

export const putPost = createAsyncThunk(
  "post/update",
  async (putData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      console.log(putData);
      return await postService.putPost(putData, token);
    } catch (error) {
      const message =
        (error.res && error.res.data && error.res.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 投稿の削除
export const deletePost = createAsyncThunk(
  "post/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.deletePost(id, token);
    } catch (error) {
      const message =
        (error.res && error.res.data && error.res.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// いいねをする
export const pushLike = createAsyncThunk(
  "post/pushLike",
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.pushLike(postData, token);
    } catch (error) {
      const message =
        (error.res && error.res.data && error.res.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const pullLike = createAsyncThunk(
  "post/pullLike",
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.pullLike(postData, token);
    } catch (error) {
      const message =
        (error.res && error.res.data && error.res.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // 投稿機能
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.posts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //  個人の投稿の取得
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // 全ての投稿の取得
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // 投稿の更新
      .addCase(putPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(putPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.posts = action.payload;
      })
      .addCase(putPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // 投稿の削除
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // 画像の保存
      .addCase(uploadImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.postImage = action.payload;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // いいねを追加
      .addCase(pushLike.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(pushLike.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(pushLike.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // いいねを削除
      .addCase(pullLike.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(pullLike.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(pullLike.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = postSlice.actions;

export default postSlice.reducer;
