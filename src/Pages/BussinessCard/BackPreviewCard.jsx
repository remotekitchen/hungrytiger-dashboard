import React, { useRef } from "react";
import { toPng } from "html-to-image";

const BackPreviewCard = ({
 
  headerText,
  bulletPoints,
  paragraphText,
  background,
  error,
}) => {
  const previewRef = useRef(null);
  const handleExportAsImage = () => {
    if (previewRef.current === null) {
      return;
    }

    toPng(previewRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "preview-image.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Oops, something went wrong!", err);
      });
  };
  return (
    <section>
      <div className="w-[600px]">
        <h3 className="text-xl font-bold">Preview</h3>

        <div
         
          className={`border p-6 flex flex-col justify-between items-center rounded-lg `}
          style={{ minHeight: "300px" }}
        >
          <div
           ref={previewRef}
            className="w-full preview-card p-6"
            style={{
              backgroundImage: `url(${background})`,
              backgroundSize: "cover",
            }}
          >
            <h1 className="text-4xl font-bold text-center">{headerText}</h1>
            <ul className="list-disc ml-5">
              {bulletPoints.map((point, index) => (
                <li key={index} className="text-xl">
                  {point}
                </li>
              ))}
            </ul>
            
      
          </div>
        </div>
      </div>

      {/* Button to export as image */}
      <button onClick={handleExportAsImage} className="btn btn-primary mt-4">
        Export as Image
      </button>
    </section>
  );
};

export default BackPreviewCard;
