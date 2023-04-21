import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// The useSelector hook is used to select the currentUser and users state from the Redux store. The useEffect hook is used to dispatch the findAllUsersThunk action when the component mounts. The users.map method is used to loop through the users and display them in a list.

import { useNavigate } from "react-router";
import { findAllUsersThunk } from "../services/users/users-thunks";

function AdminScreen() {
  const { currentUser, users } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // if (!currentUser || currentUser.role !== 'ADMIN') {
  //     navigate('/login');
  // }
  useEffect(() => {
    dispatch(findAllUsersThunk());
  }, []);
  return (
    <div>
      <h1>Admin</h1>
      <ul className="list-group">
        {users &&
          users.map((user) => {
            return (
              <li key={user.id} className="list-group-item">
                <h2>
                  {user.username} {user.firstName} {user.lastName}
                </h2>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default AdminScreen;
