import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/header/Header";
import AnswerContent from "../../components/myPage/AnswerContent";
import QuestionContent from "../../components/myPage/QuestionContent";

const Question = () => {
  const [isClick, setIsClick] = useState({
    Question1: false,
    Question2: false,
  });
  console.log(isClick.Question1);

  return (
    <QuestionLayout>
      <Header back={true} pageName="자주 묻는 질문" />
      <QuestionWrap>
        <QuestionContent
          text={"알림기능은 작동을 안하나요?"}
          isClick={isClick.Question1}
          setIsClick={setIsClick.Question1}
        />
        <AnswerContent text={"나는 모르오"} isClick={isClick.Question1} />
        <QuestionContent
          text={"배성열은 그렇게 못생겼다는게 사실인가요?"}
          isClick={isClick.Question2}
          setIsClick={setIsClick.Question2}
        />
        <AnswerContent text={"맞는다"} isClick={isClick.Q2} />
      </QuestionWrap>
    </QuestionLayout>
  );
};

const QuestionLayout = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 100vh;
  flex-direction: column;
`;
const QuestionWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 70px;
  height: ${(props) =>
    props.isIOS ? `calc(100vh - 75px)` : `calc(100vh - 65px)`};
  overflow: auto;
`;
export default Question;
