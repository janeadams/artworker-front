import { createSlice } from "@reduxjs/toolkit";
import {
  findAllUsersThunk,
  findUserByIdThunk,
  createUserThunk,
  deleteUserThunk,
  updateUserThunk,
  loginThunk,
  logoutThunk,
  profileThunk,
  registerThunk,  
} from "../services/users/users-thunks";

import { userLikesArt, userDislikesArt, findLikesByUserId } from "../art/likes-service";

const initialState = {
  users: [],
  loading: false,
  error: null,
  currentUser: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUserLikes: (state, action) => {
      state.currentUser.likes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        );
      })
      .addCase(createUserThunk.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(findAllUsersThunk.pending, (state, action) => {
        state.loading = true;
        state.users = [];
      })
      .addCase(findAllUsersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(findAllUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(findUserByIdThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(findUserByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.currentUser = null;
      })
      .addCase(profileThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
  },
});

export default usersSlice.reducer;
