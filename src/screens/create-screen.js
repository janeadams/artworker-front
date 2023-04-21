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
    <div>
      <h1>Create Artwork</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={formState.title} onChange={handleChange} />
        </label>
        <label>
          Artist Display Name:
          <input type="text" name="artistDisplayName" value={formState.artistDisplayName} onChange={handleChange} />
        </label>
        <label>
          Medium:
          <input type="text" name="medium" value={formState.medium} onChange={handleChange} />
        </label>
        <label>
          Primary Image:
          <input type="text" name="primaryImage" value={formState.primaryImage} onChange={handleChange} />
        </label>
        <label>
          Primary Image Small:
          <input type="text" name="primaryImageSmall" value={formState.primaryImageSmall} onChange={handleChange} />
        </label>
        <button type="submit">Create Artwork</button>
      </form>
    </div>
  );
};

export default CreateScreen;