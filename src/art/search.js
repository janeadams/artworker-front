import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fullTextSearch, getArtworks } from "./service";
import ArtCard from "../components/art-card";

function ArtSearchScreen() {
  const { searchTerm } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState({});
  const [artworks, setArtworks] = useState([]);

  const searchArt = async () => {
    const response = await fullTextSearch(search);
    setResults(response);
    navigate(`/art/search/${search}`);
    const slicer = 31;
    if (response.objectIDs.length < slicer) {
      slicer = response.objectIDs.length - 1;
    }
    const artData = await getArtworks(response.objectIDs.slice(0, slicer));
    //console.log('searchArt')
    //console.log(artData);
    setArtworks(artData);
    return response;
  };

  useEffect(() => {
    if (searchTerm !== undefined) {
      setSearch(searchTerm);
      searchArt();
    }
  }, [searchTerm]);

  return (
    <div>
      <h1>Search</h1>
      <p>Suggestions: "sunflowers", "pop art", "landscape", "sculpture"</p>
      <button onClick={searchArt} className="float-end btn btn-primary">
        Search
      </button>
      <input
        className="form-control w-75"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h2>Results</h2>
      <div className="container">
        {artworks.map((art) => (ArtCard(art)))}
      </div>
    </div>
  );
}

export default ArtSearchScreen;
