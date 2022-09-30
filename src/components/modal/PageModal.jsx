// React import
import React from "react";

// Package import
import styled from "styled-components";

// Element import
import Button from "../../elements/button/Button";

const PageModal = ({
  children,
  visible,
  setVisible,
  modalText,
  isConfirm,
  btnText,
  onClickBtn,
}) => {
  return (
    <ModalLayout visible={visible} onClick={() => setVisible(false)}>
      <ModalWrapper visible={visible}>
        <ModalInner
          // style={{ outline: "none" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* {children} */}

          <OptionModalContainer>
            <ModalTextWrap isConfirm={isConfirm}>{modalText}</ModalTextWrap>
            <ModalBtnWrap isConfirm={isConfirm}>
              {isConfirm ? (
                <>
                  <Button
                    text={btnText}
                    _onClick={onClickBtn}
                    style={{
                      width: "100%",
                      ft_weight: "500",
                      color: "#FFFFFF",
                    }}
                  />
                  <Button
                    text="취소"
                    _onClick={() => setVisible(false)}
                    style={{
                      width: "100%",
                      color: "#646778",
                      bg_color: "#EBEEF3",
                    }}
                  />
                </>
              ) : (
                <Button
                  text="닫기"
                  _onClick={() => setVisible(false)}
                  style={{
                    width: "100%",
                    ft_weight: "500",
                    color: "#FFFFFF",
                  }}
                />
              )}
            </ModalBtnWrap>
          </OptionModalContainer>
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

  z-index: 10;
`;

const ModalWrapper = styled.div`
  width: 90%;

  box-sizing: border-box;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  text-align: center;
  display: ${(props) => (props.visible ? "block" : "none")};
  outline: 0;
`;

const ModalInner = styled.div`
  min-height: 260px;
  /* min-height: ${(props) => props.minHeight}; */
  margin: 0 auto;

  background-color: ${(props) => props.theme.colors.White};
  border-radius: ${(props) => props.borderRadius};
  box-sizing: border-box;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  border-radius: 8px;

  position: relative;

  z-index: 20;
`;

export const OptionModalContainer = styled.div`
  width: calc(100% - 64px);
  height: calc(100% - 64px);
  padding: 32px;
`;

export const ModalTextWrap = styled.div`
  margin-top: ${(props) => (props.isConfirm ? "0px" : "60px")};
  margin-bottom: ${(props) => (props.isConfirm ? "28px" : "60px")};

  color: ${(props) => props.theme.colors.Black};
  font-size: ${(props) =>
    props.isConfirm ? props.theme.fontSizes.ms : props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.fontWeights.normal};
  line-height: ${(props) => (props.isConfirm ? "150%" : "140%")};

  text-align: center;

  display: flex;
  flex-direction: column;
  gap: 4px;

  white-space: pre-line;
`;

export const ModalBtnWrap = styled.div`
  /* position: absolute;
	bottom: 32px;
	left: 32px;
	right: 32px; */

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default PageModal;
