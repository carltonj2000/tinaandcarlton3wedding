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

const A = styled.a`
  width: 100%;
  text-align: center;
  font-weight: bold;
  padding-top: 10px;
  padding-bottom: 10px;
  background: rgba(0, 0, 200, 0.5);
  opacity: 0.5;
`;

class App extends Component {
  render() {
    return (
      <Container>
        <A href="/weddinginvite/">Wedding Invitation</A>
      </Container>
    );
  }
}

export default App;
