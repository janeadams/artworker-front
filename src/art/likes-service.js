import axios from "axios";

const LIKES_API = "http://localhost:4000/api/likes";
const USERS_API = "http://localhost:4000/api/users";

export const userLikesArt = async (userId, objectId) => {
  const response = await axios.post(
    `${USERS_API}/${userId}/likes/art/${objectId}`
  );
  return response.data;
};

export const findLikesByUserId = async (userId) => {
  const response = await axios.get(`${USERS_API}/${userId}/likes`);
  return response.data;
};
