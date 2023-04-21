// The fullTextSearch and randomArtSearch functions make requests to the MET Museum API and return the results. The getArt function makes a request to the MET Museum API for a specific artwork based on its object ID, and if the API returns an error, it falls back to retrieving the artwork from the local database. Finally, the getArtworks function takes an array of object IDs and uses getArt to retrieve information about each artwork, filtering out null values.

import axios from "axios";
import { findArtworkById } from '../services/artworker-service';
const API_URL = "https://collectionapi.metmuseum.org/public/collection/v1";

export const fullTextSearch = async (query) => {
  const response = await axios.get(
    `${API_URL}/search?q=${query}&hasImages=true`
  );
  return response.data;
};

export const randomArtSearch = async () => {
  const response = await axios.get(
    `${API_URL}/search?q=art&isOnView=true&hasImages=true`
  );
  return response.data;
};

export const getArt = async (objectId) => {
  try {
    const response = await axios.get(`${API_URL}/objects/${objectId}`);
    // console.log(response.data.title);
    return response;
  } catch (error) {
    console.log(`Error on ${objectId}. Checking local database...`);
    try {
      const response = await findArtworkById(objectId);
      return response;
    }
    catch (error) {
      console.log(`Error on ${objectId}`);
    }
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