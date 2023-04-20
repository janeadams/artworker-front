import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { registerThunk } from "../services/users/users-thunks";

function RegisterScreen() {
  const { currentUser } = useSelector((state) => state.users);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // new state for the selected role
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const register = () => {
    try {
      dispatch(registerThunk({ username, password, role })); // pass role to registerThunk
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1>Register</h1>
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
      <div className="form-group">
        <label>Password Validation</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className="form-group"> {/* add new form group for role dropdown */}
        <label>Role</label>
        <select 
          className="form-control"
          value={role} // set selected value to role state
          onChange={(e) => {
            setRole(e.target.value); // update role state when user selects a role
          }}
        >
          <option value="">Select role</option>
          <option value="CURATOR">Curator</option>
          <option value="ARTIST">Artist</option>
        </select>
      </div>
      <button onClick={register} className="btn btn-primary">
        Register
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

export default RegisterScreen;