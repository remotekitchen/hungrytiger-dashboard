import axios from "axios";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoSparklesSharp } from "react-icons/io5";
import { PhotoProvider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const AiGeneratedImage = ({
  selectedImage,
  setSelectedImage,
  itemName,
  nextItems,
  filteredItems,
  isEditing,
}) => {
  const [imageUrl, setImageUrl] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const fetchGoogleSearchData = async (query) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1?q=${query}&key=${
          import.meta.env.VITE_GOOGLE_SEARCH_API_KEY
        }&cx=${import.meta.env.VITE_SEARCH_ENGINE_ID}`
      );
      return response.data.items;
    } catch (err) {
      console.error("Error fetching search data:", err);
      return null;
    }
  };

  const createPromptFromSearch = (searchResults, dishName) => {
    const topResult = searchResults?.[0];
    if (topResult) {
      const description = topResult.snippet || topResult.title;
      return `A high-quality photo of a ${dishName} dish, including ingredients like ${description}`;
    }
    return `A dish called ${dishName}`;
  };

  const generateImage = async () => {
    if (!inputRef.current || inputRef.current.value === "") {
      toast.error("Please enter a prompt to search for an image.");
      return;
    }
    setLoading(true);
    try {
      const searchResults = await fetchGoogleSearchData(inputRef.current.value);
      const autoPrompt = createPromptFromSearch(
        searchResults,
        inputRef.current.value
      );

      console.log(autoPrompt, "autoPrompt");

      const response = await axios.post(
        "https://api.openai.com/v1/images/generations",
        {
          prompt: autoPrompt,
          n: 1,
          size: "1024x1024",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        }
      );
      const imageUrl = response.data.data;
      setImageUrl(imageUrl);
    } catch (err) {
      console.error("Error generating image:", err);
      toast.error("Error generating image");
      setError(err.response?.data?.error?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (url) => {
    setSelectedImage(url);
  };

  return (
    <div>
      <div className="grid grid-cols-12 gap-3">
        {/* Static AI Generated Button */}
        <div className="col-span-6 cursor-pointer relative inline-flex items-center justify-center overflow-hidden text-gray-800 rounded shadow-md shadow-black-400 p-1 gradient-flow-border">
          <div className="flex items-center justify-center bg-gray-100 w-full h-full py-2 gap-2">
            <div onClick={generateImage} className="flex items-center gap-2">
              <IoSparklesSharp className="text-xl text-gray-500" />
              <span className="text-gray-700 font-semibold text-sm">
                Generate AI Image
              </span>
            </div>
          </div>
        </div>

        {/* Input for search query */}
        <div className="col-span-6">
          <input
            type="text"
            ref={inputRef}
            placeholder="Enter your prompt..."
            className="input input-bordered w-full"
            defaultValue={itemName || filteredItems?.[nextItems]?.name || ""}
          />
        </div>
      </div>

      {/* Display the fetched image */}
      {loading ? (
        <div className="w-full h-96 flex justify-center items-center">
          <img
            src="/loading2.gif" // Assuming the gif is located in your public folder
            alt="Loading..."
            className="w-full h-full object-contain"
          />
        </div>
      ) : (
        imageUrl?.length > 0 && (
          <PhotoProvider maskOpacity={0.8}>
            <div className="my-5 border-2 border-gray-300 rounded p-3 w-full">
              {imageUrl.map((image) => (
                <div
                  key={image.url}
                  className={`w-full h-64 p-2 cursor-pointer ${
                    selectedImage === image.url
                      ? "bg-purple-300"
                      : "bg-transparent"
                  }`}
                  onClick={() => handleImageClick(image.url)}
                >
                  <img
                    src={image.url}
                    alt="AI Generated Image"
                    className="w-full h-full object-contain rounded"
                  />
                </div>
              ))}
            </div>
          </PhotoProvider>
        )
      )}
    </div>
  );
};

export default AiGeneratedImage;
