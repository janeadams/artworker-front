import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getArtworks, randomArtSearch } from "./service";
import ArtCard from "../components/art-card";

function ArtScreen() {
  const [results, setResults] = useState({});
  const [artworks, setArtworks] = useState([]); // set to null instead of []

  const randomArt = async () => {
    const response = await randomArtSearch();
    setResults(response);
    console.log(response);
    const artData = await getArtworks(response.objectIDs.slice(0, 11));
    console.log(artData);
    setArtworks(artData);
    return response;
  };

  useEffect(() => {
    randomArt();
  }, []); // only run once when the component mounts

  return (
    <div>
      <h1>Art</h1>
      <Link to="/art/search">Search</Link>
      <div className='container'>
          {artworks.map((art) => (ArtCard(art)))}
      </div>
    </div>
  );
}

export default ArtScreen;
