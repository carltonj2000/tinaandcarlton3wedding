import React from "react";
import styled from "styled-components";

const Photos = styled.div`
  background: gray;
  display: grid;
  width: 100%;
  grid-gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(105px, 1fr));
`;

const Img = styled.img`
  width: 100%;
`;

class PhotosComponent extends React.Component {
  state = { hasError: false };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    const { images, photoModalOpen } = this.props;
    if (this.state.hasError || !images) {
      return <h1>Something went wrong during photo loading.</h1>;
    }
    return (
      <Photos>
        {images.map((img, idx) => (
          <Img
            src={img.name}
            key={`${idx}`}
            alt={img.description}
            onClick={() => photoModalOpen(idx)}
          />
        ))}
      </Photos>
    );
  }
}

export default PhotosComponent;
