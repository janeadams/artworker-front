import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArt } from "./service";
import { useSelector } from "react-redux";
import { userLikesArt } from "./likes-service";

function ArtDetailsScreen() {
  const { currentUser } = useSelector((state) => state.users);
  const { id } = useParams();
  const [art, setArt] = useState({});
  const [liked, setLiked] = useState(false); // <-- Add state to track if art is liked
  const fetchArt = async () => {
    const response = await getArt(id);
    setArt(response.data);
  };
  const likeArt = async () => {
    if (Array.isArray(currentUser.likes)) {
      const response = await userLikesArt(currentUser._id, id);
      console.log(response);
      if (response.status === 200) {
        console.log("Like added!");
      } else {
        console.log(response);
      }
    } else {
      console.log("Likes is not an array");
    }
    setLiked(true); // <-- Update liked state to true
  };
  useEffect(() => {
    fetchArt();
    // Check if the art is already liked by the user
    if (currentUser && Array.isArray(currentUser.likes)) {
      setLiked(currentUser.likes.includes(id));
    }
  }, [currentUser, id]);
  return (
    <div>
      <h2>{currentUser && currentUser.username}</h2>
      <img className='feature' src={art.primaryImage}></img>
      <h1>{art.title}</h1>
      <h2>{art.artistDisplayName}</h2>
      <p>{art.medium}. {art.dimensions}. {art.creditLine}</p>
      {currentUser && (
        <>
          <button onClick={likeArt} className={`btn ${liked ? "btn-secondary" : "btn-success"}`}>
            {liked ? "Liked" : "Like"}
          </button>
          <button className={`btn ${liked ? "btn-danger" : "btn-secondary"}`}>
            {liked ? "Dislike" : "Unlike"}
          </button>
        </>
      )}
    </div>
  );
}

export default ArtDetailsScreen;
