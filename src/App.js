import React, { Component, Fragment } from "react";
import Home from "./Home";

const lakeLv1 = require("./images/374412058721534514.jpg");

const Container = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  background: `url(${lakeLv1})`,
  height: "100vh",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundSize: "contain"
};

const A = {
  textAlign: "center",
  opacity: "0.5",
  margin: "10px"
};

class App extends Component {
  state = { showPhotos: false };
  showPhotos = e => this.setState({ showPhotos: true });
  render() {
    const { showPhotos } = this.state;
    return (
      <Fragment>
        {showPhotos ? (
          <Fragment>
            <button
              onClick={() => this.setState({ showPhotos: false })}
              style={{
                margin: "2px",
                width: "100%",
                background: "rgba(0, 0, 200, 0.5)",
                fontSize: "24px"
              }}
            >
              Return To Main Screen
            </button>
            <Home />
          </Fragment>
        ) : (
          <div style={Container}>
            <a style={A} href="http://tinaandcarlton.com/honeymoon/">
              Honeymoon Pics
            </a>
            <a style={A} href="#" onClick={this.showPhotos}>
              Wedding Pictures
            </a>
            <a style={A} href="http://tinaandcarlton.com/weddinginvite/">
              Wedding Invitation
            </a>
          </div>
        )}
      </Fragment>
    );
  }
}

export default App;
