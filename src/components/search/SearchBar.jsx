// React import
// import React, { useState } from "react";

// Redux import
// import { useDispatch } from "react-redux";
// import { auctionSearchThunk } from "../../redux/modules/SearchSlice";

// Package import
// import { IoSearchOutline } from "react-icons/io5";

// Style import
// import styled from "styled-components";

// const SearchBar = (onAddKeyword) => {
//   const [keyword, setKeyword] = useState();
//   const dispatch = useDispatch();

//   const handleKeyword = (e) => {
//     setKeyword(e.target.value);
//   };

//   const handleClearKeyword = () => {
//     setKeyword("");
//   };

//   const onKeyPress = (e) => {
//     if (e.key === "Enter") {
//       dispatch(auctionSearchThunk(keyword));
//     }
//   };

//   const handleAddKeyword = (keyword) => {
//     console.log(keyword);
//     const newKeyword = {
//       keyword: keyword,
//     };
//     setKeyword([newKeyword, ...keyword]);
//   };

//   return (
//     <SearchInputGroup>
//       <SearchInputWrap>
//         <SearchBar onAddKeyword={handleAddKeyword}></SearchBar>
//         <SearchInput
//           type="text"
//           onChange={(e) => setKeyword(e.target.value)}
//           placeholder="검색어를 입력해주세요."
//           onKeyDown={(e) => onKeyPress(e)}
//         />
//         <SearchInputIcon>
//           <IoSearchOutline className="icon" />
//         </SearchInputIcon>
//       </SearchInputWrap>
//     </SearchInputGroup>
//   );
// };

// export default SearchBar;

// export const SearchInputGroup = styled.div`
//   width: 100%;
//   height: 36px;
//   position: relative;
//   box-sizing: border-box;
//   margin-top: 10%;
// `;

// export const SearchInputWrap = styled.div`
//   width: 100%;
//   height: 36px;
//   position: absolute;
//   box-sizing: border-box;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// export const SearchInput = styled.input`
//   width: 90%;
//   height: 36px;
//   position: absolute;
//   box-sizing: border-box;
//   border: none;
//   background-color: ${(props) => props.theme.colors.Gray1};
//   border-radius: 8px;
//   font-size: ${(props) => props.theme.fontSizes.sm};
//   padding-left: 35px;
//   &:focus {
//     outline: none;
//     border-color: ${(props) => props.theme.colors.Gray3};
//   }
// `;

// export const SearchInputIcon = styled.div`
//   .icon {
//     position: absolute;
//     color: ${(props) => props.theme.colors.Gray3};
//     top: 50%;
//     left: 40px;
//     transform: translate(-50%, -50%);
//   }
// `;
