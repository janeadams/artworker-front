import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArt } from "./service";

function ArtDetailsScreen() {
  const { id } = useParams();
  const [art, setArt] = useState({});
  const fetchArt = async () => {
    const response = await getArt(id);
    setArt(response);
  };
  useEffect(() => {
    fetchArt();
  }, []);
  return (
    <div>
      <h1>{art.title}</h1>
    </div>
  );
}

export default ArtDetailsScreen;
