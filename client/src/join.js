import React, { useState } from "react";
import axios from "axios";
import { Input, Button } from "semantic-ui-react";

const JoinForm = props => {
  //   console.log('props in login', props)
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    e.preventDefault();
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };
  const register = e => {
    e.preventDefault();
    const body = {
      username: credentials.username,
      password: credentials.password
    };
    // console.log('make axios call with these credentials', credentials)
    axios
      .post("http://localhost:5001/api/register", credentials)
      .then(response => {
        console.log(response);

        props.history.push("/");
      })
      .catch(error => console.log("Error:", error.response.data.error));
  };

  return (
    <form onSubmit={register} className="joinForm">
      <Input
        type="text"
        name="username"
        value={credentials.username}
        placeholder="username"
        onChange={handleChange}
      />
      <br />
      <Input
        type="password"
        name="password"
        value={credentials.password}
        placeholder="password"
        onChange={handleChange}
      />
      <br />
      <Button circular color="green">
        Join
      </Button>
    </form>
  );
};

export default JoinForm;