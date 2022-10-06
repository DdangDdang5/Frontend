import imageCompression from 'browser-image-compression';

export const handleFileOnChange = async (file) => {
	// max width & height = 410
  const options = { maxSizeMB: 1, maxWidthOrHeight: 410 };

  try {
    const compressedFile = await imageCompression(file, options);

		// Blob to File
    const resultFile = new File([compressedFile], compressedFile.name, {
      type: compressedFile.type,
    });

    return resultFile;
  } catch (error) {
    console.log(error);
  }
};

export const handleUrlOnChange = async (compressedFile) => {
  try {
    const url = await imageCompression.getDataUrlFromFile(compressedFile);
    return url;
  } catch (error) {
    console.log(error);
  }
};
