// import imageCompression from 'browser-image-compression';

// const handleFileOnChange = async (file) => {
//   const options = { maxSizeMB: 1, maxWidthOrHeight: 420 };
//   try {
//     const compressedFile = await imageCompression(file, options);
//     const resultFile = new File([compressedFile], compressedFile.name, {
//       type: compressedFile.type,
//     });
//     return resultFile;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const handleUrlOnChange = async (compressedFile) => {
//   try {
//     const url = await imageCompression.getDataUrlFromFile(compressedFile);
//     return url;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const change = async (event) => {
//   let fileArr = event.target.files; // 사용자가 선택한 파일들
//   let postImagesLength = img.length;
//   let filesLength = fileArr.length > 10 ? 10 : fileArr.length; // 최대 10개
//   if (postImagesLength + filesLength > 10) {
//     alert("이미지는 10장을 초과할 수 없습니다.");
//     return;
//   }
//   // resize해서 파일 처리하기
//   for (let i = 0; i < filesLength; i++) {
//     let newFile = await handleFileOnChange(fileArr[i]);
//     let newFileURL = await handleUrlOnChange(newFile);
//     setImg((file) => [...file, newFile]);
//     setImgUrl((url) => [...url, newFileURL]);
//   }
// };