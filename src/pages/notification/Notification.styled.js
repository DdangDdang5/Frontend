import styled from "styled-components";

export const NotifContainer = styled.div`
  width: 100%;
`;

export const NotifContent = styled.div`
  width: 100%;
  margin-top: ${(props) => (props.data ? "16px" : null)};
  position: absolute;
  top: 70px;
  bottom: 0;

  display: flex;
  flex-direction: column-reverse;
  justify-content: ${(props) => (props.data ? "flex-end" : "center")};
  align-items: center;
  gap: 28px;
`;

export const NotifItem = styled.div`
  width: calc(100% - 40px);
  padding: 0px 20px;

  color: ${(props) =>
    props.read ? props.theme.colors.Gray3 : props.theme.colors.Black};

  font-family: "Spoqa Han Sans Neo";
  font-style: normal;
  font-size: ${(props) => props.theme.fontSizes.ms};
  font-weight: ${(props) => props.theme.fontWeights.normal};
  line-height: 150%;

  display: flex;

  svg {
    width: 40px;
    height: 40px;
  }
`;

export const NotifInfo = styled.div`
  width: 100%;
  margin-left: 14px;

  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const NotifTitle = styled.span`
  width: 60%;
  font-weight: ${(props) => props.theme.fontWeights.bold} !important;

  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const NotifTime = styled.div`
  color: ${(props) => props.theme.colors.Gray3};
  font-size: ${(props) => props.theme.fontSizes.sm};
  line-height: 140%;
`;

export const NotifNone = styled.div`
  margin-bottom: 70px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  svg {
    width: 150px;
    height: 150px;
  }

  div {
    color: ${(props) => props.theme.colors.Black};
    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-size: ${(props) => props.theme.fontSizes.md};
    font-weight: ${(props) => props.theme.fontWeights.normal};
    line-height: 140%;
  }
`;
