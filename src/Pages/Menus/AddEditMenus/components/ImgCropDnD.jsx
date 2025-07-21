import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./GetCropImage";

export const ImgCropDnD = () => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    // console.log("Cropped area pixels:", croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      if (croppedAreaPixels) {
        // console.log("Cropping image with area:", croppedAreaPixels);
        const croppedImageUrl = await getCroppedImg(
          `https://img.freepik.com/premium-photo/schezwan-noodles-vegetable-hakka-noodles-chow-mein-is-popular-indo-chinese-recipes-served-bowl-plate-with-wooden-chopsticks_466689-46449.jpg`,
          croppedAreaPixels
        );
        // console.log("Cropped Image URL:", croppedImageUrl);
        setCroppedImage(croppedImageUrl);
      } else {
        console.warn("Cropped area pixels are not set.");
      }
    } catch (e) {
      console.error("Error cropping the image:", e);
    }
  }, [croppedAreaPixels]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="relative w-full h-72">
        <Cropper
          image={`https://img.freepik.com/premium-photo/schezwan-noodles-vegetable-hakka-noodles-chow-mein-is-popular-indo-chinese-recipes-served-bowl-plate-with-wooden-chopsticks_466689-46449.jpg`}
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
        <span
          onClick={showCroppedImage}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Crop
        </span>
      </div>
      <div className="relative w-full h-72 flex items-center justify-center border border-gray-300">
        {croppedImage ? (
          <img
            src={croppedImage}
            alt="Cropped"
            className="max-w-full max-h-full"
          />
        ) : (
          <p className="text-gray-500">No image cropped yet.</p>
        )}
        <span
          onClick={showCroppedImage}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Crop
        </span>
      </div>
    </div>
  );
};
