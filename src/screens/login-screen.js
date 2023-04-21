import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loginThunk } from "../services/users/users-thunks";

function LoginScreen() {
  const { currentUser } = useSelector((state) => state.users);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = async () => {
    try {
      const response = await dispatch(loginThunk({ username, password }));
      const currentUser = response.payload;
      if (currentUser) {
        navigate("/profile");
      } else {
        alert("User not found. Please register.");
        navigate("/register");
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        alert("User not found. Please register.");
        navigate("/register");
      } else {
        console.log(err);
      }
    }
  };
  return (
    <div className='container-narrow'>
      <h1>Login</h1>
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <button onClick={login} className="btn btn-primary">
        Login
      </button>
      <div>
        {currentUser && (
          <div>
            <h2>{currentUser.username}</h2>
            <h2>{currentUser.password}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginScreen;
