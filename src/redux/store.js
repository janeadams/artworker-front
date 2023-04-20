import { configureStore } from "@reduxjs/toolkit";
import artworksReducer from "./artworks-reducer";
import usersReducer from "./users-reducer";

const store = configureStore({
  reducer: {
    artworks: artworksReducer,
    users: usersReducer,
  },
});

export default store;
