// This file exports several createAsyncThunk functions, which are used to define Redux thunks for interacting with a server-side API to perform CRUD (Create, Read, Update, Delete) operations on user objects.

// The createAsyncThunk functions take two arguments: a name for the thunk action, and a function that performs the async operation. Each of these thunks makes a call to the corresponding function in userService and returns the data or error response from the server.

// These thunks will then be dispatched by the Redux actions in the app when the user interacts with the UI, triggering the desired CRUD operation on the server.

import * as userService from "./users-service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const findAllUsersThunk = createAsyncThunk("users/findAll", async () => {
  const users = await userService.findAllUsers();
  return users;
});

export const findUserByIdThunk = createAsyncThunk("users/findById", async (id) => {
    const response = await userService.findUserById(id);
    return response.data;
  }
);

export const createUserThunk = createAsyncThunk("users/create", async (user) => {
    const response = await userService.createUser(user);
    return response.data;
  }
);
export const updateUserThunk = createAsyncThunk("users/update", async (user) => {
    await userService.updateUser(user);
    return user;
  }
);

export const deleteUserThunk = createAsyncThunk("users/delete", async (id) => {
  await userService.deleteUser(id);
  return id;
});

export const loginThunk = createAsyncThunk(
  "users/login",
  async (user) => {
    try {
      const response = await userService.login(user);
      return { data: response.data, status: response.status };
    } catch (error) {
      throw error.response;
    }
  }
);

export const logoutThunk = createAsyncThunk("users/logout", async () => {
  await userService.logout();
});

export const registerThunk = createAsyncThunk("users/register", async (user) => {
    const response = await userService.register(user);
    return response.data;
  }
);

export const profileThunk = createAsyncThunk("users/profile", async () => {
  const response = await userService.profile();
  return response.data;
});
