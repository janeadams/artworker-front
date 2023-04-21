import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  profileThunk,
  logoutThunk,
  updateUserThunk,
} from "../services/users/users-thunks";
import { useNavigate, useParams } from "react-router";
import { findUserById } from "../services/users/users-service";

function AdminScreen() {
  const { userId } = useParams();
  const { currentUser } = useSelector((state) => state.users);
  const [profile, setProfile] = useState(currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchProfile = async () => {
    if (userId) {
      const user = await findUserById(currentUser._id);
      setProfile(user);
      return;
    }
    const response = await dispatch(profileThunk());
    setProfile(response.payload);
  };
  const loadScreen = async () => {
    await fetchProfile();
  };
  const updateProfile = async () => {
    await dispatch(updateUserThunk(profile));
  };

  useEffect(() => {
    loadScreen();
  }, [userId]);
  return (
    <div className='container-narrow'>

      <div>
        {currentUser && (
          <div>
            <h2>
              Welcome {currentUser.username}!
            </h2>
            <p>{currentUser.username}, your profile id is {currentUser._id}</p>
          </div>
        )}
      </div>

      {profile && (
        <div>
          <h2>Update settings:</h2>
          <div>
            <label>Username</label>
            <input
              type="text"
              readOnly={true}
              className="form-control"
              value={currentUser.username}
              onChange={(e) => {
                setProfile({ ...currentUser, username: e.target.value });
              }}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              readOnly={typeof userId !== undefined}
              className="form-control"
              value={profile.password}
              onChange={(e) => {
                setProfile({ ...currentUser, password: e.target.value });
              }}
            />
          </div>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              value={profile.firstName}
              onChange={(e) => {
                setProfile({ ...currentUser, firstName: e.target.value });
              }}
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              value={profile.lastName}
              onChange={(e) => {
                setProfile({ ...currentUser, lastName: e.target.value });
              }}
            />
          </div>
          <button onClick={updateProfile} className="btn btn-success">
            Update
          </button>
        </div>
      )}

      <button
        className="btn btn-danger"
        onClick={() => {
          dispatch(logoutThunk());
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default AdminScreen;
