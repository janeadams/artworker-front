import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArt } from "./service";
import { useSelector } from "react-redux";
import { userLikesArt, userDislikesArt } from "./likes-service";

function ArtDetailsScreen() {
  const { currentUser } = useSelector((state) => state.users);
  const { id } = useParams();
  const [art, setArt] = useState({});
  const [liked, setLiked] = useState(false);
  const fetchArt = async () => {
    const response = await getArt(id);
    console.log(response)
    setArt(response.data);
  };
  const likeArt = async () => {
    setLiked(true);
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
  };
  const dislikeArt = async () => {
    setLiked(false); // <-- Update liked state to false
    if (Array.isArray(currentUser.likes)) {
      const response = await userDislikesArt(currentUser._id, id);
      console.log(response);
      if (response.status === 200) {
        console.log("Like removed!");
      } else {
        console.log(response);
      }
    } else {
      console.log("Likes is not an array");
    }
  };
  useEffect(() => {
    fetchArt();
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
          <button onClick={dislikeArt} className={`btn ${liked ? "btn-danger" : "btn-secondary"}`}>
            {liked ? "Dislike" : "Unlike"}
          </button>
        </>
      )}
    </div>
  );
}

export default ArtDetailsScreen;
