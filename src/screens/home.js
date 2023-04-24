import React, { useState, useEffect } from "react";
import { findAllUsers } from '../services/users/users-service';
import { randomArtSearch, getArtworks } from "../art/service";
import ArtCard from "../components/art-card";

function Home() {
  const [users, setUsers] = useState([]);
  const [artworks, setArtworks] = useState([]);

  const searchArt = async () => {
    const response = await randomArtSearch();
    //console.log(response); // Check the response object in the console
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
      //console.log(response);
      setUsers(response);
    };
    getUsers();
  }, []);

  return (
    <div>
      <p>Artworker is a React-based social networking platform designed for curators and artists who are passionate about art and who are looking for a convenient way to share their collections and network with other professionals in the industry.</p>

      <p>With Artworker, users can easily create accounts and connect with other users to discover and curate a wide range of artworks, from classical paintings to modern sculptures. The platform allows users to create their own virtual galleries and share them with other users, providing a unique and personalized experience for each curator and artist.</p>

      <p>Artworker is also designed to help artists promote their artwork to a wider audience, with features such as tagging and sharing options. Curators can follow their favorite artists to discover new and emerging talents and keep up-to-date with their latest works.</p>

      <p>In addition to sharing and curating art, Artworker is also designed to help users expand their professional networks. Users can connect with other curators and artists from around the world, share their expertise, and collaborate on projects.</p>

      <p>Overall, Artworker is a vibrant community of art lovers, curators, and artists who share a passion for the world of art. Whether you're an established curator, a budding artist, or just a lover of beautiful works of art, Artworker is the perfect platform for you to share, explore, and connect with others who share your interests.</p>
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
