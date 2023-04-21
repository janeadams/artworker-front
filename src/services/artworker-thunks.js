import {createAsyncThunk}
  from "@reduxjs/toolkit"
import * as service
  from "./artworker-service"

export const findArtworksThunk = createAsyncThunk('artworks/findArtworks', async () =>
  await service.findArtworks()
)

export const findArtworkByIdThunk = createAsyncThunk('artworks/findArtworkById', async (artworkId) => {
    await service.findArtworkById(artworkId)
    return artworkId
})

export const deleteArtworkThunk = createAsyncThunk('artworks/deleteArtwork', async (artworkId) => {
    await service.deleteArtwork(artworkId)
    return artworkId
})

export const createArtworkThunk = createAsyncThunk('artworks/createArtwork', async (artwork) => {
    const newArtwork = await service.createArtwork(artwork)
    return newArtwork
})
  
export const updateArtworkThunk = createAsyncThunk('artworks/updateArtwork', async (artwork) =>
  await service.updateArtwork(artwork)
)
  