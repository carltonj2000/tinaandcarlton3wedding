import React, { Component } from "react";
import styled from "styled-components";

const lakeLv1 = require("./images/374412058721534514.jpg");

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url(${lakeLv1});
  height: 100vh;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
`;

class App extends Component {
  render() {
    return (
      <Container>
        <a href="/weddinginvite">Wedding Invitation</a>
      </Container>
    );
  }
}

export default App;
