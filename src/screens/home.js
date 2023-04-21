// The useState and useEffect hooks are used to fetch and display the list of active users. The findAllUsers function is called within the useEffect hook to retrieve the list of users, and the list is stored in the users state using the setUsers function. Finally, the list of users is mapped to a list of <li> elements and rendered in the component.

import React, { useState, useEffect } from "react";
import { findAllUsers } from '../services/users/users-service';

function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await findAllUsers();
      setUsers(response);
    };
    getUsers();
  }, []);

  return (
    <div>
      <h1>Active Users:</h1>
      <ul>
        {users.map((user) => <li key={user.id}>{user.username}</li>)}
      </ul>
    </div>
  );
}

export default Home;