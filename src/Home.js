import React, { Component } from "react";
import styled from "styled-components";

import Photos from "./Photos.js";
import PhotoModal from "./PhotoModal.js";

import {
  images_81x54 as imagesSmall,
  images_405x270 as imagesMedium,
  images_1620x1080 as images
} from "./utils/images";

const last = images.length - 2;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

class Home extends Component {
  state = {
    isOpen: false,
    img: imagesMedium[last],
    imgIdx: last,
    hd: false,
    imagesSmall,
    imagesMedium,
    images
  };
  openModal = idx => {
    window.scrollTo(0, 0);
    return this.setState(state => ({
      isOpen: true,
      img: state.hd ? state.images[idx] : state.imagesMedium[idx],
      imgIdx: idx
    }));
  };
  closeModal = () => this.setState({ isOpen: false });
  toggleHd = () =>
    this.setState(
      state => ({ ...state, hd: !state.hd }),
      () => this.nextImg(0)
    );
  nextImg = by =>
    this.setState(state => {
      let imgIdx = (state.imgIdx + by) % state.images.length;
      if (imgIdx < 0) imgIdx = state.images.length - 1;
      return {
        ...state,
        img: state.hd ? state.images[imgIdx] : state.imagesMedium[imgIdx],
        imgIdx: imgIdx
      };
    });
  render() {
    return (
      <Container>
        <PhotoModal
          show={this.state.isOpen}
          onClose={this.closeModal}
          img={this.state.img}
          nextImg={this.nextImg}
          hd={this.state.hd}
          toggleHd={this.toggleHd}
        />
        <Photos
          images={this.state.imagesSmall}
          photoModalOpen={this.openModal}
        />
      </Container>
    );
  }
}

export default Home;
