// React import
import React, { Fragment } from "react";

// Shared import
import { NoSearch } from "../../shared/images";

// Style import
import {
  SearchResultContainer,
  SearchResultBox,
  SearchResultLogo,
  SearchResultSpan,
} from "./SearchResult.styled";

const SearchResult = () => {
  return (
    <Fragment>
      <SearchResultContainer>
        <SearchResultBox>
          <SearchResultLogo>
            <NoSearch />
          </SearchResultLogo>
          <SearchResultSpan>
            <span>검색 결과가 없어요.</span>
          </SearchResultSpan>
          <SearchResultSpan>
            <span>다른 키워드로 검색해 보세요.</span>
          </SearchResultSpan>
        </SearchResultBox>
      </SearchResultContainer>
    </Fragment>
  );
};

export default SearchResult;

