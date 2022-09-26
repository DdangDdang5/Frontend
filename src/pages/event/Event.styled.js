// Package import
import styled from "styled-components";

export const EventItem = styled.div`
  width: clac(100% - 40px);
  height: 183px;
  min-height: 183px;

  border-radius: 8px;
  background-color: aliceblue;
`;

export const EventContentWrap = styled.div`
  width: calc(100% - 40px);
  padding: 16px 20px 36px 20px;

  position: absolute;
  top: 70px;
  bottom: 0;

  display: flex;
  flex-direction: column;
  gap: 20px;

  overflow: scroll;
`;

export const EventContentTitle = styled.span`
  font-weight: ${(props) => props.theme.fontWeights.medium};
  font-size: ${(props) => props.theme.fontSizes.md};
  line-height: 140%;

  /* text 2줄로 제한 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

export const EventImgWrap = styled.div`
  width: 100%;
  height: 183px;
  min-height: 183px;

  border-radius: 8px;
`;

export const EventInfo = styled.div`
  color: ${(props) => props.theme.colors.Black};
  font-size: ${(props) => props.theme.fontSizes.ms};
  font-weight: ${(props) => props.theme.fontWeights.normal};
  line-height: 150%;

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const EventInfoType = styled.span`
  width: 70px;
  margin-right: 23px;

  color: ${(props) => props.theme.colors.Gray3};
  font-size: ${(props) => props.theme.fontSizes.sm} !important;
  line-height: 140%;

  display: inline-block;
`;

export const EventInfoContent = styled.div`
  margin-bottom: 20px;

  color: ${(props) => props.theme.colors.Black};
  font-size: ${(props) => props.theme.fontSizes.ms};
  font-weight: ${(props) => props.theme.fontWeights.normal};
  line-height: 150%;
`;

export const EventBtnWrap = styled.div``;
