import axios from "axios";

const USERS_API = "http://localhost:4000/api/users";

export const userLikesArt = async (userId, artworkId) => {
  const post_url = `${USERS_API}/${userId}/likes/${artworkId}`;
  const response = await axios.post(post_url);
  return response.data;
};

export const userDislikesArt = async (userId, artworkId) => {
  const post_url = `${USERS_API}/${userId}/dislikes/${artworkId}`;
  const response = await axios.post(post_url);
  return response.data;
};

export const findLikesByUserId = async (userId) => {
  const response = await axios.get(`${USERS_API}/${userId}/likes`);
  return response.data;
};