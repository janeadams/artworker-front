import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fullTextSearch, getArtworks } from "./service";
import ArtCard from "../components/art-card";
function ArtSearchScreen() {
  const { searchTerm } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState(searchTerm);
  const [results, setResults] = useState({});
  const [artworks, setArtworks] = useState([]);
  const searchArt = async () => {
    const response = await fullTextSearch(search);
    setResults(response);
    console.log(response);
    navigate(`/art/search/${search}`);
    const artData = await getArtworks(response.objectIDs.slice(0, 10));
    console.log(artData);
    setArtworks(artData);
    console.log(artworks);
    return response;
  };
  
  useEffect(() => {
    if (searchTerm) {
      searchArt();
    }
  }, [searchTerm]);
  
  return (
    <div>
      <h1>Art Search</h1>
      <button onClick={searchArt} className="float-end btn btn-primary">
        Search
      </button>
      <input
        className="form-control w-75"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h2>Art</h2>
      <div className='container'>
          {artworks.map((art) => (ArtCard(art)))}
      </div>
    </div>
  );
}

export default ArtSearchScreen;
