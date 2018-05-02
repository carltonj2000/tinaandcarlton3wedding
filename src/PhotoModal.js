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
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
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
  position: absolute;
  top: 0;
  left: 0;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const Bottom = styled.div`
  display: flex;
  position: absolute;
  top: 50vh;
  left: 0;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export default props => {
  if (!props.show) return null;
  return (
    <Backdrop>
      <Modal>
        <Top>
          <Button onClick={props.toggleHd} title="select HD/SD images">
            {props.hd ? <span>HD</span> : <span>SD</span>}
          </Button>
          <Description>{props.img.description}</Description>
          <Button onClick={props.onClose}>X</Button>
        </Top>
        <Img src={props.img.name} />
        <Bottom>
          <Button onClick={() => props.nextImg(-1)}>&larr;</Button>
          <Button onClick={() => props.nextImg(1)}>&rarr;</Button>
        </Bottom>
      </Modal>
    </Backdrop>
  );
};
