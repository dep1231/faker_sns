import axios from "axios";

const API_URL = "http://localhost:8000/api/post/";
const UPLOAD_API_URL = "http://localhost:8000/api/upload/";

// 投稿機能
const createPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.post(API_URL, postData, config);
  return data;
};

// 画像の投稿

const uploadImage = async (postData) => {
  const config = {
    headers: {
      // Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
  };
  console.log(postData);
  const { data } = await axios.post(
    UPLOAD_API_URL + "uploadImage",
    postData,
    config
  );
  console.log(data);
  return data;
};

// 自分の投稿データの取得
const getPosts = async (userId) => {
  const { data } = await axios.get(API_URL + "profile/" + userId);

  return data;
};

// 特定の投稿を取得する

// 全ての投稿の取得

const getAllPosts = async () => {
  const { data } = await axios.get(API_URL + "all");

  return data;
};
// 投稿を更新する
const putPost = async (putData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.put(API_URL + putData.id, putData, config);
  console.log(putData);
  return data;
};
// 投稿を削除する
const deletePost = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.delete(API_URL + id, config);

  return id;
};
// いいねをする
const pushLike = async (postData, token) => {
  const { userId, paramsId } = postData;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.put(
    API_URL + "like/" + paramsId,
    { userId: userId },
    config
  );

  return data;
};
// いいねを取り消す
const pullLike = async (postData, token) => {
  const { userId, paramsId } = postData;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.put(
    API_URL + "unlike/" + paramsId,
    { userId: userId },
    config
  );

  return data;
};

const postService = {
  createPost,
  getPosts,
  getAllPosts,
  putPost,
  deletePost,
  uploadImage,
  pushLike,
  pullLike,
};

export default postService;
