import axios from "axios";

const LIKES_API = "http://localhost:4000/api/likes";
const USERS_API = "http://localhost:4000/api/users";

export const userLikesArt = async (userId, objectId) => {
  const post_url = `${USERS_API}/${userId}/likes/art/${objectId}`;
  console.log(post_url)
  const response = await axios.post(post_url);
  console.log(response)
  return response.data;
};

export const findLikesByUserId = async (userId) => {
  const response = await axios.get(`${USERS_API}/${userId}/likes`);
  console.log(response)
  return response.data;
};
