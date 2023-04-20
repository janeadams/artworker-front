import { Link } from "react-router-dom";

const ArtCard = (art) => {
   return (<div className="card" key={art.objectID}>
    <img className="card-img-top artwork" src={art.primaryImageSmall} alt="Card image cap"></img>
    <div className="d-inline-block card-body" style={{maxWidth: 200 + 'px', maxHeight: 100 + 'px', width: 200 + 'px', height: 100 + 'px'}}>
        <h3 className="card-title">{art.title}</h3>
        <h4>{art.artistDisplayName}</h4>
    </div>
    </div>
)}
export default ArtCard;