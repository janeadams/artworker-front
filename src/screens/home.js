import React, { useState, useEffect } from "react";
import { findAllUsers } from '../services/users/users-service';
import { randomArtSearch, getArtworks } from "../art/service";
import ArtCard from "../components/art-card";

function Home() {
  const [users, setUsers] = useState([]);
  const [artworks, setArtworks] = useState([]);

  const searchArt = async () => {
    const response = await randomArtSearch();
    console.log(response); // Check the response object in the console
    const artData = await getArtworks(response.objectIDs?.slice(0, 31) ?? []);
    setArtworks(artData);
    return response;
  };

  useEffect(() => {
    searchArt();
  }, []); // Add an empty dependency array to call the function only once

  useEffect(() => {
    const getUsers = async () => {
      const response = await findAllUsers();
      console.log(response);
      setUsers(response);
    };
    getUsers();
  }, []);

  return (
    <div>
      <h1>Active Users:</h1>
      <ul>
        {users.map((user) => <li key={user._id}><a href={"/profile/"+user._id}>{user.username}</a></li>)}
      </ul>
      <h2>Featured Art</h2>
      <div className="container">
      {artworks.map((art) => (ArtCard(art)))}
      </div>
    </div>
  );
}

export default Home;
