// React import
import React, { useState } from "react";

// Package import
import styled from "styled-components";

// Component & Page import
import Header from "../../components/header/Header";
import AnswerContent from "../../components/myPage/AnswerContent";
import QuestionContent from "../../components/myPage/QuestionContent";

const Question = () => {
  const [isClick, setIsClick] = useState({
    question1: false,
    question2: false,
  });

  return (
    <QuestionLayout>
      <Header back={true} pageName="자주 묻는 질문" />
      <QuestionWrap>
        <QuestionContent
          onClick={() =>
            setIsClick((prev) => ({
              ...prev,
              question1: !prev.question1,
            }))
          }
          text={"알림기능은 작동을 안하나요?"}
          isClick={isClick.question1}
        />
        <AnswerContent
          text={"현재 개발중입니다."}
          isClick={isClick.question1}
        />
        <QuestionContent
          text={"신고기능은 작동을 안하나요?"}
          isClick={isClick.question2}
          onClick={() =>
            setIsClick((prev) => ({
              ...prev,
              question2: !prev.question2,
            }))
          }
        />
        <AnswerContent
          text={"현재 개발중입니다."}
          isClick={isClick.question2}
        />
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
