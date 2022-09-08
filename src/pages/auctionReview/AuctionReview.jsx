// React import
import React from "react";

// Component import
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

// Style import
import {
  AnswerContainer,
  AnswerItem,
  AnswerList,
  AnswerRadioBtn,
  AuctionReviewContainer,
  AuctionReviewContent,
  QuestionList,
  ReviewItem,
  ReviewItemContent,
  ReviewItemPrice,
  ReviewItemPriceWrap,
  ReviewItemTitle,
  ReviewItemWrap,
  ReviewItemWrapTitle,
  TagWrap,
} from "./AuctionReview.styled";

const AuctionReview = () => {
  const answerList = ["매우나쁨", "나쁨", "보통", "좋음", "매우좋음"];

  return (
    <AuctionReviewContainer>
      <Header page="평가하기" write={true} />

      <AuctionReviewContent>
        {/* 평가 경매 */}
        <ReviewItemWrap>
          <ReviewItemWrapTitle>평가하는 경매</ReviewItemWrapTitle>
          <ReviewItem>
            <img src="maskable.png" alt="auction-new-img" />
            <ReviewItemContent>
              <TagWrap backgroundColor="gray">
                <span>택배</span>
                <span>직거래</span>
                <span>동작구</span>
              </TagWrap>
              <ReviewItemTitle>
                제목은 한 줄만 노출됩니다. 길어진 텍스트는 줄어듭니다.
              </ReviewItemTitle>
              <ReviewItemPriceWrap>
                <span>최종낙찰가</span>
                <ReviewItemPrice>5000원</ReviewItemPrice>
              </ReviewItemPriceWrap>
            </ReviewItemContent>
          </ReviewItem>
        </ReviewItemWrap>

        <QuestionList>
          {Array.from({ length: 5 }, (_, i) => (
            <AnswerContainer key={i}>
              <p>
                {i + 1}. {i + 1}번째 질문. 임시 텍스트입니다.
              </p>
              <AnswerList>
                {answerList.map((item, idx) => {
                  const inputName = `action-review-${i}`;
                  return (
                    <AnswerItem key={idx}>
                      <AnswerRadioBtn type="radio" id={item} name={inputName} />
                      <span>{item}</span>
                    </AnswerItem>
                  );
                })}
              </AnswerList>
            </AnswerContainer>
          ))}
        </QuestionList>
      </AuctionReviewContent>

      <Footer />
    </AuctionReviewContainer>
  );
};

export default AuctionReview;
