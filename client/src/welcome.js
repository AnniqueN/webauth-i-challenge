import React from "react";
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Segment
} from "semantic-ui-react";
import { Link } from 'react-router-dom';
import LoginForm from "./login";

const Welcome = (props) => (
  <Segment>
    <Grid columns={2} stackable textAlign="center">
      <Divider vertical>Or</Divider>
      <Grid.Row verticalAlign="middle">
        <Grid.Column>
          <Header icon>
            <Icon name="key" />
            Login
          </Header>
          <LoginForm props={props}/>
        </Grid.Column>

        <Grid.Column>
          <Header icon>
            <Icon name="user plus" />
            Register
          </Header>
          <br />
          <Button circular as={Link} to={'/join'} color="green">Join</Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
);

export default Welcome;