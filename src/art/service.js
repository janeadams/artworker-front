import axios from "axios";
const API_URL = "https://collectionapi.metmuseum.org/public/collection/v1";

export const fullTextSearch = async (query) => {
  const response = await axios.get(
    `${API_URL}/search?q=${query}`
  );
  return response.data;
};

export const getArt = async (objectId) => {
  try {
    const response = await axios.get(`${API_URL}/objects/${objectId}`);
    console.log(response.data.title);
    return response;
  } catch (error) {
    console.log(`Error on ${objectId}`);
    return error;
  }
};

export const getArtworks = async (objectIDs) => {
  const artworks = await Promise.all(objectIDs.map(async function(id) {
    const response = await getArt(id);
    if (response && response.data && response.data.primaryImageSmall) {
      return response.data;
    } else {
      return null; // or return a default object
    }
  }));
  return artworks.filter(art => art !== null); // remove null values from the array
};