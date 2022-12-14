// React import
import React from "react";

// Package import
import styled from "styled-components";

const ChatOptionModal = ({ children, visible, setVisible, minHeight }) => {
  return (
    <ModalLayout visible={visible} onClick={() => setVisible(false)}>
      <ModalWrapper visible={visible}>
        <ModalInner
          minHeight={minHeight}
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
  background-color: rgba(0, 0, 0, 0.7);

  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  display: ${(props) => (props.visible ? "block" : "none")};
`;

const ModalWrapper = styled.div`
  width: 100%;
  max-width: 190px;

  box-sizing: border-box;

  position: absolute;
  top: 70px;
  right: 0;

  display: ${(props) => (props.visible ? "block" : "none")};
  outline: 0;
`;

const ModalInner = styled.div`
  min-height: ${(props) => props.minHeight};
  margin: 0 auto;

  background-color: ${(props) => props.theme.colors.White};
  border-radius: ${(props) => props.borderRadius};
  box-sizing: border-box;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  border-radius: 8px;

  position: relative;
`;

export default ChatOptionModal;
