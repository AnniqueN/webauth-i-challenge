import React from "react";
import { Link } from "react-router-dom";
import { Menu} from "semantic-ui-react";

const Nav = (props) => {
  const logout = (e) => {
      e.preventDefault();
      localStorage.removeItem('token');
      props.history.push('/')
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