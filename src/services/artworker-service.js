import axios from 'axios';
const ARTWORK_API = 'http://localhost:4000/api/artworks';

export const createArtwork = async (artwork) => {
    const response = await axios.post(ARTWORK_API, artwork)
    return response.data;
   }   
export const findArtworks = async () => {
    const response = await axios.get(ARTWORK_API);
    const artworks = response.data;
    return artworks;
   }

export const findArtworkById = async (artworkId) => {
    const response = await axios.get(`${ARTWORK_API}/${artworkId}`)
    return response.data
}
   
export const deleteArtwork = async (artworkId) => {
    const response = await axios
        .delete(`${ARTWORK_API}/${artworkId}`)
    return response.data
}
  
export const updateArtwork = async (artwork) => {
    const response = await axios
      .put(`${ARTWORK_API}/${artwork._id}`, artwork);
    return artwork;
  }
  