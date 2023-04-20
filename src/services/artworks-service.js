import axios from 'axios';
const ARTWORK_API = 'localhost:3000/api/artworks';

export const createArtwork = async (artwork) => {
    const response = await axios.post(TUITS_API, artwork)
    return response.data;
   }   
export const findArtworks = async () => {
    const response = await axios.get(TUITS_API);
    const artworks = response.data;
    return artworks;
   }
   
export const deleteArtwork = async (tid) => {
    const response = await axios
        .delete(`${TUITS_API}/${tid}`)
    return response.data
}
  
export const updateArtwork = async (artwork) => {
    const response = await axios
      .put(`${TUITS_API}/${artwork._id}`, artwork);
    return artwork;
  }
  