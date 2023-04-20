import { createSlice } from "@reduxjs/toolkit";
import {
  createArtworkThunk,
  findAllArtworksThunk,
  deleteArtworkThunk,
  updateArtworkThunk,
} from "../services/artworker-thunks";

const initialState = {
  artworks: [],
  loading: false,
  error: null,
};

const artworksSlice = createSlice({
  name: "artworks",
  initialState,
  reducers: {},
  extraReducers: {
    [updateArtworkThunk.fulfilled]: (state, action) => {
      state.artworks = state.artworks.map((artwork) =>
        artwork._id === action.payload._id ? action.payload : artwork
      );
    },
    [createArtworkThunk.fulfilled]: (state, action) => {
      state.artworks.push(action.payload);
    },
    [deleteArtworkThunk.fulfilled]: (state, action) => {
      state.artworks = state.artworks.filter((artwork) => artwork._id !== action.payload);
    },
    [findAllArtworksThunk.pending]: (state, action) => {
      state.loading = true;
      state.artworks = [];
    },
    [findAllArtworksThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.artworks = action.payload;
    },
    [findAllArtworksThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const { updateArtwork, deleteArtwork, addArtwork } = artworksSlice.actions;
export default artworksSlice.reducer;
