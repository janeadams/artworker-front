// Creates a Redux store using configureStore from @reduxjs/toolkit and sets up two reducers: artworksReducer and usersReducer. The store is exported to be used in the application.

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
