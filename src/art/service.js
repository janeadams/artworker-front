// The fullTextSearch and randomArtSearch functions make requests to the MET Museum API and return the results. The getArt function makes a request to the MET Museum API for a specific artwork based on its object ID, and if the API returns an error, it falls back to retrieving the artwork from the local database. Finally, the getArtworks function takes an array of object IDs and uses getArt to retrieve information about each artwork, filtering out null values.

import axios from "axios";
import { findArtworkById } from '../services/artworker-service';
const MET_API = "https://collectionapi.metmuseum.org/public/collection/v1";
const ARTWORK_API = 'http://localhost:4000/api/artworks';

export const fullTextSearch = async (query) => {
  const query_url = `${MET_API}/search?q=${query}`
  console.log('Random art search..')
  console.log(query_url)
  const response = await axios.get(query_url);
  return response.data;
};

export const randomArtSearch = async () => {
  const query_url = `${MET_API}/search?q=landscape`
  console.log('Random art search..')
  console.log(query_url)
  const response = await axios.get(query_url);
  return response.data;
};

export const getArt = async (objectId) => {
  // console.log("getArtwork: " + objectId)
  try {
    // console.log('Getting data from MET API...')
    const get_url = `${MET_API}/objects/${objectId}`
    // console.log(get_url)
    const response = await axios.get(get_url);
    // console.log(`Success! ${response.data.title} by ${response.data.artistDisplayName}`);
    try {
      // console.log(`Trying to post artwork ${objectId} to local database`)
      const post_url = `${ARTWORK_API}`
      // console.log(post_url)
      // Post the artwork data to the database using the API endpoint
      await axios.post(post_url, response.data);
      // console.log(`Successfully posted ${objectId} to local database`)
      return response;
    } catch (error) {
      console.log(`Error posting ${objectId} to local database: ${error}`);
      console.log()
    }
  } catch (error) {
    console.log(`Error finding ${objectId} in the MET database. Checking local database...`);
    try {
      const response = await findArtworkById(objectId);
      return response;
    }
    catch (error) {
      console.log(`Error finding ${objectId} in either database: ${error}`);
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