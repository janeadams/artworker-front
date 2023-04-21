import axios from "axios";

const USERS_API = "http://localhost:4000/api/users";

export const userLikesArt = async (userId, artworkId) => {
  const post_url = `${USERS_API}/${userId}/likes/${artworkId}`;
  console.log(post_url);
  console.log({ userId, artworkId }); // Add this line to log the request payload
  const response = await axios.post(post_url);
  return response.data;
};

export const userDislikesArt = async (userId, artworkId) => {
  const post_url = `${USERS_API}/${userId}/dislikes/${artworkId}`;
  console.log(post_url);
  console.log({ userId, artworkId }); // Add this line to log the request payload
  const response = await axios.post(post_url);
  return response.data;
};

export const findLikesByUserId = async (userId) => {
  const response = await axios.get(`${USERS_API}/${userId}/likes`);
  return response.data;
};
