export default function getCroppedImg(imageSrc, crop) {
  const canvas = document.createElement("canvas");
  const image = new Image();
  return new Promise((resolve, reject) => {
    image.onload = () => {
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("Canvas is empty. Unable to crop the image.");
          return;
        }
        const croppedImageUrl = URL.createObjectURL(blob);
        // console.log("Cropped Image Blob URL:", croppedImageUrl);
        resolve(croppedImageUrl);
      }, "image/jpeg");
    };
    image.onerror = (error) => {
      console.error("Error loading image:", error);
      reject(error);
    };
    image.src = imageSrc;
  });
}
