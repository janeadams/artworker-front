// The Navbar component is rendering different links based on whether a user is logged in or not. If the user is logged in, links to the profile and create pages are shown. Otherwise, links to the login and register pages are shown. Links to the admin, home, and art pages are always displayed. The current user is obtained from the Redux store using the useSelector hook.

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../logos-01.svg";

export default function NavBar() {
  const { currentUser } = useSelector((state) => state.users);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" href="/"><img src={logo}></img></Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/art">Art</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/art/search">Search</Link></li>
      {!currentUser && (
        <>
          <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
        </>
      )}
      {currentUser && (
        <>
        <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/create">Create</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/admin">Admin</Link></li>
        </>
      )
    }
      </ul>
      </div>
    </nav>
  );
}
