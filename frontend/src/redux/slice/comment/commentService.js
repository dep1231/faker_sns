import axios from "axios";

const API_URL = "http://localhost:8000/api/post/";

// 投稿の取得
const getPostFind = async (postId) => {
  const { data } = await axios.get(API_URL + "post/" + postId);

  return data;
};

// 投稿機能

const createComment = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(postData.postData);
  const { data } = await axios.post(
    API_URL + "comment",
    postData.postData,
    config
  );

  return data;
};

const commentService = {
  getPostFind,
  createComment,
};

export default commentService;
