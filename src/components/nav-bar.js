// The Navbar component is rendering different links based on whether a user is logged in or not. If the user is logged in, links to the profile and create pages are shown. Otherwise, links to the login and register pages are shown. Links to the admin, home, and art pages are always displayed. The current user is obtained from the Redux store using the useSelector hook.

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function NavBar() {
  const { currentUser } = useSelector((state) => state.users);
  return (
    <div>
      <Link to="/admin">Admin</Link>|<Link to="/">Home</Link>|
      <Link to="/art">Art</Link>|
      {!currentUser && (
        <>
          <Link to="/login">Login</Link>|<Link to="/register">Register</Link>|
        </>
      )}
      {currentUser && <Link to="/profile">Profile</Link>}
      {currentUser && <Link to="/create">Create</Link>}
    </div>
  );
}
