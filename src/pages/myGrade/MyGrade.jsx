// React import
import React from "react";

// Component import
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

// Style import
import {
	MyGradeBar,
	MyGradeBarWrap,
  MyGradeContainer,
  MyGradeContent,
  MyGradeGrade,
  MyGradeImgWrap,
  MyGradeInfo,
	MyGradeNickname,
	MyGradeText,
} from "./MyGrade.styled";

const MyGrade = () => {
  return (
    <MyGradeContainer>
      <Header logo={false} />

      <MyGradeContent>
        <MyGradeImgWrap>
          <img src="maskable.png" alt="mygrade" />
        </MyGradeImgWrap>
        <MyGradeInfo>
          <span>기본망치</span>
          <MyGradeNickname>닉네임 예시</MyGradeNickname>
        </MyGradeInfo>

        <MyGradeGrade>
          <p>신뢰도</p>
          <MyGradeBarWrap>
						<MyGradeBar>
							<div></div>
						</MyGradeBar>
					</MyGradeBarWrap>
        </MyGradeGrade>
        <MyGradeText>경매 완료 후 상호 평가된 점수로 신뢰도가 매겨집니다.</MyGradeText>
      </MyGradeContent>

      <Footer />
    </MyGradeContainer>
  );
};

export default MyGrade;
