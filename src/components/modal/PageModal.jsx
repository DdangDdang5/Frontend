// React import
import React from "react";

// Element import
import Button from "../../elements/button/Button";

// Style import
import {
  ModalBtnWrap,
  ModalInner,
  ModalLayout,
  ModalTextWrap,
  ModalWrapper,
  OptionModalContainer,
} from "./PageModal.styled";

const PageModal = ({
  visible,
  setVisible,
  modalText,
  isConfirm,
  btnText,
  onClickBtn,
  onClickCloseBtn,
}) => {
  return (
    <ModalLayout visible={visible} onClick={() => setVisible(false)}>
      <ModalWrapper visible={visible}>
        <ModalInner onClick={(e) => e.stopPropagation()}>
          <OptionModalContainer>
            <ModalTextWrap isConfirm={isConfirm}>{modalText}</ModalTextWrap>
            <ModalBtnWrap isConfirm={isConfirm}>
              {isConfirm ? (
                // window.confirm()과 같은 alert
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
                // window.alert()과 같은 alert
                <Button
                  text="닫기"
                  _onClick={
                    onClickCloseBtn ? onClickCloseBtn : () => setVisible(false)
                  }
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

export default PageModal;
