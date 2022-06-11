import axios from "axios";
const API_URL = "http://localhost:8000/api/user/";

// ユーザーの取得
const getUsers = async (userId) => {
  const { data } = await axios.get(API_URL + userId);
  return data;
};
// ユーザの更新
const updateUsers = async (postData, token) => {
  console.log(postData);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios.put(API_URL + postData.userId, postData, config);
  return postData;
};

// フォローする
const pushFollow = async (postId, token) => {
  const { userId, paramsId } = postId;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios.put(API_URL + "follow/" + paramsId, { userId: userId }, config);
  return userId;
};

// フォローを外す

const pullFollow = async (postId, token) => {
  const { userId, paramsId } = postId;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios.put(API_URL + "unfollow/" + paramsId, { userId: userId }, config);
  return userId;
};

// フォロワーの取得
const getFollowers = async (paramsId) => {
  const { data } = await axios.get(API_URL + "followers/" + paramsId);
  return data;
};

// フォローしている人の取得
const getFollowings = async (paramsId) => {
  const { data } = await axios.get(API_URL + "followings/" + paramsId);
  return data;
};

const usersService = {
  getUsers,
  pushFollow,
  pullFollow,
  getFollowers,
  getFollowings,
  updateUsers,
};

export default usersService;
