// React import
import React from "react";

// Package import
import styled from "styled-components";

const AuctionJoinModal = ({ children, visible, setVisible, minHeight }) => {
  return (
    <ModalLayout visible={visible} onClick={() => setVisible(false)}>
      <ModalWrapper visible={visible}>
        <ModalInner
          onClick={(e) => e.stopPropagation()}
        >
					{children}
        </ModalInner>
      </ModalWrapper>
    </ModalLayout>
  );
};

const ModalLayout = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);

  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  display: ${(props) => (props.visible ? "block" : "none")};
`;

const ModalWrapper = styled.div`
  width: 100%;
	height: 50%;
	max-height: fit-content;

  box-sizing: border-box;

  position: absolute;
	left: 0;
	bottom: 0;
	right: 0;

  display: ${(props) => (props.visible ? "block" : "none")};
  outline: 0;
`;

const ModalInner = styled.div`
  margin: 0 auto;

  background-color: ${(props) => props.theme.colors.White};
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
  box-sizing: border-box;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);

  position: relative;
`;

export default AuctionJoinModal;
