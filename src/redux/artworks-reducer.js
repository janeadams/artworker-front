import { createSlice } from "@reduxjs/toolkit";
import {
  createArtworkThunk,
  findArtworksThunk,
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
  reducers: {
    updateArtwork: (state, action) => {
      state.artworks = state.artworks.map((artwork) =>
        artwork._id === action.payload._id ? action.payload : artwork
      );
    },
    deleteArtwork: (state, action) => {
      state.artworks = state.artworks.filter((artwork) => artwork._id !== action.payload);
    },
    addArtwork: (state, action) => {
      state.artworks.push(action.payload);
    },
  },
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
    [findArtworksThunk.pending]: (state, action) => {
      state.loading = true;
      state.artworks = [];
    },
    [findArtworksThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.artworks = action.payload;
    },
    [findArtworksThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const { updateArtwork, deleteArtwork, addArtwork } = artworksSlice.actions;
export default artworksSlice.reducer;
