import React from "react";
import { Link } from "react-router-dom";
import { Menu} from "semantic-ui-react";
import axios from 'axios';
axios.defaults.withCredentials = true;


const Nav = (props) => {
  const logout = (e) => {
      e.preventDefault();
      axios.get("http://localhost:5001/api/logout")
      .then(response => {
        console.log(response);
        props.history.push('/')
      })
      .catch(error => {
        console.log(error);
      })
  }
  return (
    <Menu>
      <Menu.Item as={Link} to={"/"}>
        Home
      </Menu.Item>
      <Menu.Item as={Link} to={"/userlist"}>
        Userlist
      </Menu.Item>
      <Menu.Item onClick={logout} to={"/"}>
        Logout
      </Menu.Item>
    </Menu>
  );
};

export default Nav;