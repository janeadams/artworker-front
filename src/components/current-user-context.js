// This is a React component that sets up a context for the current user, which is retrieved using a Redux thunk. The useEffect hook with an empty dependency array ensures that the profileThunk is dispatched only once, when the component mounts. This component can be used as a parent component to wrap other components that need access to the current user information.

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { profileThunk } from "../services/users/users-thunks";
function CurrentUserContext({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(profileThunk());
  }, []);
  return children;
}

export default CurrentUserContext;
