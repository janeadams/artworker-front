import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { createArtworkThunk } from "../services/artworker-thunks";

const CreateScreen = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    title: "",
    artistDisplayName: "",
    medium: "",
    dimensions: "",
    primaryImage: "",
    primaryImageSmall: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createArtworkThunk(formState));
    navigate("/");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <div className="container">
  <h1>Create Artwork</h1>
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="title">Title:</label>
      <input type="text" className="form-control" id="title" name="title" value={formState.title} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label htmlFor="artistDisplayName">Artist Display Name:</label>
      <input type="text" className="form-control" id="artistDisplayName" name="artistDisplayName" value={formState.artistDisplayName} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label htmlFor="medium">Medium:</label>
      <input type="text" className="form-control" id="medium" name="medium" value={formState.medium} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label htmlFor="dimensions">Dimensions:</label>
      <input type="text" className="form-control" id="dimensions" name="dimensions" value={formState.dimensions} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label htmlFor="primaryImage">Primary Image:</label>
      <input type="text" className="form-control" id="primaryImage" name="primaryImage" value={formState.primaryImage} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label htmlFor="primaryImageSmall">Primary Image Small:</label>
      <input type="text" className="form-control" id="primaryImageSmall" name="primaryImageSmall" value={formState.primaryImageSmall} onChange={handleChange} />
    </div>
    <button type="submit" className="btn btn-primary">Create Artwork</button>
  </form>
</div>

  );
};

export default CreateScreen;