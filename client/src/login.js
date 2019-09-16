import React, { useState } from "react";
import axios from 'axios';
import { Input, Button } from 'semantic-ui-react'


const LoginForm = (props) => {
//   console.log('props in login', props)
  const [credentials, setCredentials] = useState({
      username: "",
      password: ""
  })


  const handleChange = (e) => {
    e.preventDefault();
    setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
    })
  }
  const login = (e) => {
    e.preventDefault();
    const reqOptions = {
        headers: {
            username: credentials.username,
            password: credentials.password
        }
    }
    // console.log('make axios call with these credentials', credentials)
    axios.post('http://localhost:5001/api/login', {}, reqOptions)
    .then(response => {
        console.log(response)
        //response.data.token is the token
        // console.log('response', response);
        localStorage.setItem('token', response.data.token)
        props.props.history.push('/userlist')

    })
    .catch(error => console.log('Error:', error.response.data.error))
  }

  return (
    <form onSubmit={login}>
      <Input
        type="text"
        name="username"
        value={credentials.username}
        placeholder="username"
        onChange={handleChange}
      />
      <Input
        type="password"
        name="password"
        value={credentials.password}
        placeholder="password"
        onChange={handleChange}
      />
      <br/><Button circular color="teal">Login</Button>
    </form>
  );
};

export default LoginForm;