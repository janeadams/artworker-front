import { Link } from "react-router-dom";

function ArtScreen() {
  return (
    <div>
      <h1>Art</h1>
      <Link to="/art/search">Search</Link>
    </div>
  );
}

export default ArtScreen;
