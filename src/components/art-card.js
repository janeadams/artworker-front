// The ArtCard component returns a Link component that wraps a div containing an image, title, and artist name. The key prop is set to the objectID of the art object, which is used to uniquely identify each card when rendering in a list. The style prop is used to set the maximum width and height of the card body, as well as the actual width and height.

import { Link } from "react-router-dom";

const ArtCard = (art) => {
   return (<Link to={`/artworks/${art.objectID}`}><div className="card" key={art.objectID}>
    <img className="card-img-top artwork" src={art.primaryImageSmall} alt="Card image cap"></img>
    <div className="d-inline-block card-body" style={{maxWidth: 200 + 'px', maxHeight: 100 + 'px', width: 200 + 'px', height: 100 + 'px'}}>
        <h3 className="card-title">{art.title}</h3>
        <h4>{art.artistDisplayName}</h4>
    </div>
    </div></Link>
)}
export default ArtCard;