import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArt } from "./service";
import { useSelector } from "react-redux";
import { userLikesArt } from "./likes-service";

function ArtDetailsScreen() {
  const { currentUser } = useSelector((state) => state.users);
  console.log(currentUser)
  const { id } = useParams();
  const [art, setArt] = useState({});
  const fetchArt = async () => {
    const response = await getArt(id);
    setArt(response.data);
  };
  const likeArt = async () => {
    console.log('likeArt triggered')
    const response = await userLikesArt(currentUser._id, id);
    console.log(response);
  };
  useEffect(() => {
    fetchArt();
  }, []);
  return (
    <div>
      <h2>{currentUser && currentUser.username}</h2>
      <img className='feature' src={art.primaryImage}></img>
      <h1>{art.title}</h1>
      <h2>{art.artistDisplayName}</h2>
      <p>{art.medium}. {art.dimensions}. {art.creditLine}</p>
      {currentUser && (
        <>
          <button onClick={likeArt} className="btn btn-success">
            Like
          </button>
          <button className="btn btn-danger">Unlike</button>
        </>
      )}
    </div>
  );
}

export default ArtDetailsScreen;
