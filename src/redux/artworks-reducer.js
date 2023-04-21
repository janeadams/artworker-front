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
  extraReducers: (builder) => {
    builder
      .addCase(updateArtworkThunk.fulfilled, (state, action) => {
        state.artworks = state.artworks.map((artwork) =>
          artwork._id === action.payload._id ? action.payload : artwork
        );
      })
      .addCase(createArtworkThunk.fulfilled, (state, action) => {
        state.artworks.push(action.payload);
      })
      .addCase(deleteArtworkThunk.fulfilled, (state, action) => {
        state.artworks = state.artworks.filter((artwork) => artwork._id !== action.payload);
      })
      .addCase(findArtworksThunk.pending, (state) => {
        state.loading = true;
        state.artworks = [];
      })
      .addCase(findArtworksThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.artworks = action.payload;
      })
      .addCase(findArtworksThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateArtwork, deleteArtwork, addArtwork } = artworksSlice.actions;
export default artworksSlice.reducer;
