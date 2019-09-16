import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from 'semantic-ui-react';

const UserList = () => {
  const [users, setUsers] = useState();
  const token = localStorage.getItem('token')

  // this should be recoded to get a token from local or session storage, 
  // and make GET request on /users

  useEffect(() => {
    token &&
    axios
      .get("http://localhost:5001/api/usernames")
      .then(response => {
        // console.log(response);
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
      <div>
          {users && users.map(user => <Card color='green'>{user.username}</Card>)}
      </div>
  )
};

export default UserList;