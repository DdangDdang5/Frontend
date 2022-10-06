// Styled import
import styled from "styled-components";

export const HistoryBox = styled.div`
  width: 100%;
  height: 70vh;
  margin-top: 7px;

  box-sizing: border-box;
`;

export const HeaderContent = styled.div`
  height: 28vh;

  position: relative;
`;

export const Title = styled.span`
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color: ${(props) => props.theme.colors.Black};
  font-size: ${(props) => props.theme.fontSizes.ms};

  float: left;
`;

export const RecentKeywordWrap = styled.div`
  width: 100%;
  margin-top: 40px;

  position: absolute;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  gap: 12px;
  flex-wrap: wrap;
`;

export const KeywordContainer = styled.li`
  overflow: hidden;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const RecentKeyword = styled.div`
  height: 24px;
  padding: 4px 12px;

  border-radius: 100px;
  font-family: "Spoqa Han Sans Neo";
  font-size: ${(props) => props.theme.fontSizes.ms};
  font-weight: ${(props) => props.theme.fontWeights.normal};
  color: ${(props) => props.theme.colors.Black};
  background-color: ${(props) => props.theme.colors.Gray1};
  line-height: 24px;

  cursor: pointer;
`;

export const PopularKeywordWrap = styled.div`
  width: 100%;
  height: 250px;

  position: relative;
  top: 20px;
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 50%;
  flex-direction: column;
  box-sizing: border-box;
  gap: 24px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const PopularNum = styled.div`
  width: 19px;
  height: 24px;

  font-size: ${(props) => props.theme.fontSizes.ms};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color: ${(props) => props.theme.colors.Black};
  text-align: center;
  line-height: 24px;

  position: absolute;
`;

export const PopularKeyword = styled.div`
  width: 134px;
  margin-left: 30px;

  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.fontWeights.normal};
  font-family: "Spoqa Han Sans Neo";
  color: ${(props) => props.theme.colors.Black};
  line-height: 25.2px;

  display: flex;
  flex-direction: row;
  gap: 12px;
  box-sizing: border-box;
`;
