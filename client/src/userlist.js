import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from 'semantic-ui-react';
axios.defaults.withCredentials = true;


const UserList = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/users")
      .then(response => {
        console.log(response);
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