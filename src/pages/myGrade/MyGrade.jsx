// React import
import React from "react";

// Component import
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

// Shared import
import {
  LogoClassic,
  LogoGold,
  LogoRainbow,
  LogoSilver,
  LogoWood,
} from "../../shared/images";

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
  NextGrade,
  NowGrade,
} from "./MyGrade.styled";

const MyGrade = () => {
  const point = 25;
  let nextPoint = 0;

  const nowState = (
    <svg
      width="16"
      height="12"
      viewBox="0 0 12 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.79241 7.97064C6.3921 8.49064 5.6079 8.49064 5.20759 7.97064L0.31117 1.61C-0.195027 0.952426 0.273737 1.19999e-06 1.10358 1.12744e-06L10.8964 2.71323e-07C11.7263 1.98776e-07 12.195 0.952425 11.6888 1.60999L6.79241 7.97064Z"
        fill="#C5D0E1"
      />
    </svg>
  );

  const checkLogo = (point) => {
    if (point !== 0) {
      if (point >= 50) {
        nextPoint = 100;
        return <LogoRainbow />;
      } else if (point >= 25) {
        nextPoint = 50;
        return <LogoGold />;
      } else if (point >= 10) {
        nextPoint = 25;
        return <LogoSilver />;
      } else if (point >= -10) {
        nextPoint = 10;
        return <LogoClassic />;
      } else {
        nextPoint = -10;
        return <LogoWood />;
      }
    }
  };

  const calcPoint = (point) => {
    return Math.round(((point + 20) / 70) * 100);
  };

  return (
    <MyGradeContainer>
      <Header close={true} pageName="신뢰도 안내" />

      <MyGradeContent>
        <MyGradeImgWrap>
          <div></div>
          {/* <LogoClassic /> */}
          {checkLogo(point)}
        </MyGradeImgWrap>
        <MyGradeInfo>
          <span>기본망치</span>
          <MyGradeNickname>닉네임 예시</MyGradeNickname>
        </MyGradeInfo>

        <MyGradeGrade>
          <p>신뢰도</p>
          <MyGradeBarWrap>
            <MyGradeBar point={calcPoint(point)}>
              <NowGrade point={calcPoint(point) - 2}>{nowState}</NowGrade>
              <NextGrade nextPoint={calcPoint(nextPoint) - 8}>
                <span>다음 등급</span>
                {nowState}
              </NextGrade>
            </MyGradeBar>
          </MyGradeBarWrap>
        </MyGradeGrade>
        <MyGradeText>
          경매 완료 후 상호 평가된 점수로 신뢰도가 매겨집니다.
        </MyGradeText>
      </MyGradeContent>

      <Footer />
    </MyGradeContainer>
  );
};

export default MyGrade;
