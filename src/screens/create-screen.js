import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { createArtworkThunk } from "../services/artworker-thunks";

function CreateScreen() {
  const { currentUser } = useSelector((state) => state.users);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [creditLine, setCreditLine] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [medium, setMedium] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const create = () => {
    try {
      dispatch(createArtworkThunk({ title, artist, creditLine, dimensions, medium, image }));
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1>Create Artwork</h1>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div className="form-group">
        <label>Artist</label>
        <input
          type="text"
          className="form-control"
          value={artist}
          onChange={(e) => {
            setArtist(e.target.value);
          }}
        />
      </div>
        <div className="form-group">
        <label>Credit Line</label>
        <input
            type="text"
            className="form-control"
            value={creditLine}
            onChange={(e) => {
                setCreditLine(e.target.value);
            }}
        />
        </div>
        <div className="form-group">
        <label>Dimensions</label>
        <input
            type="text"
            className="form-control"
            value={dimensions}
            onChange={(e) => {
                setDimensions(e.target.value);
            }}
        />
        </div>
        <div className="form-group">
        <label>Medium</label>
        <input
            type="text"
            className="form-control"
            value={medium}
            onChange={(e) => {
                setMedium(e.target.value);
            }}
        />
        </div>
        <div className="form-group">
        <label>Image URL</label>
        <input
            type="text"
            className="form-control"
            value={image}
            onChange={(e) => {
                setImage(e.target.value);
            }}
        />
        </div>
      
      <button onClick={create} className="btn btn-primary">
        Submit
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

export default CreateScreen;