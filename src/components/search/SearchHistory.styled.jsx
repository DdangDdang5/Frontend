// Styled import
import styled from "styled-components";

export const HistoryBox = styled.div`
  padding: 18px;
  padding-top: 32px;
  padding-left: 20px;
  box-sizing: border-box;
  height: 70vh;
  width: 100%;
`;

export const HeaderContent = styled.div`
  position: relative;
  height: 28vh;
`;

export const Title = styled.span`
  float: left;
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color: ${(props) => props.theme.colors.Black};
`;

export const RecentKeywordWrap = styled.div`
  position: absolute;
  margin-top: 40px;
  width: 100%;
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
  border-radius: 100px;
  padding: 4px 12px;
  font-family: "Spoqa Han Sans Neo";
  height: 24px;
  font-size: ${(props) => props.theme.fontSizes.ms};
  font-weight: ${(props) => props.theme.fontWeights.normal};
  color: ${(props) => props.theme.colors.Black};
  background-color: ${(props) => props.theme.colors.Gray1};
  line-height: 24px;
`;

export const PopularKeywordWrap = styled.div`
  position: relative;
  height: 200px;
  width: 350px;
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 50%;
  flex-direction: column;
  box-sizing: border-box;
  gap: 12px;
  top: 20px;
`;

export const PopularNum = styled.div`
  position: absolute;
  width: 19px;
  height: 24px;
  font-size: ${(props) => props.theme.fontSizes.ms};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color: ${(props) => props.theme.colors.Black};
  text-align: center;
  line-height: 24px;
`;

export const PopularKeyword = styled.div`
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.fontWeights.normal};
  font-family: "Spoqa Han Sans Neo";
  color: ${(props) => props.theme.colors.Black};
  line-height: 25.2px;
  width: 134px;
  display: flex;
  flex-direction: row;
  gap: 12px;
  box-sizing: border-box;
  margin-left: 30px;
`;