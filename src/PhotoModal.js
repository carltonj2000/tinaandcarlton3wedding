import React from "react";
import styled from "styled-components";

const Backdrop = styled.div`
  z-index: 9997;
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 9999;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100vw;
  height: 100vh;
`;

const Button = styled.button`
  font-size: 16px;
  padding: 10px 20px;
  margin: 5px;
`;

const Description = styled.div`
  padding: 10px;
  margin: 5px;
  font-size: 16px;
  border-radius: 10px;
  background: rgba(200, 200, 200, 0.5);
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

export default props => {
  if (!props.show) return null;
  return (
    <Backdrop>
      <Modal
        style={{
          backgroundImage: `url(${props.img.name})`
        }}
      >
        <Top>
          <Button onClick={props.toggleHd} title="select HD/SD images">
            {props.hd ? <span>HD</span> : <span>SD</span>}
          </Button>
          <Description>
            {props.img.description},{props.img.file}
          </Description>
          <Button onClick={props.onClose}>X</Button>
        </Top>
        <img src={props.img.name} style={{ zIndex: 100, display: "flex" }} />
        <Container>
          <Bottom>
            <Button onClick={() => props.nextImg(-1)}>&larr;</Button>
            <Button onClick={() => props.nextImg(1)}>&rarr;</Button>
          </Bottom>
        </Container>
      </Modal>
    </Backdrop>
  );
};
