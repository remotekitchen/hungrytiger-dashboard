import React, { useEffect, useState } from "react";
// Bootstrap CSS
// import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
// import "bootstrap/dist/js/bootstrap.bundle.min";
import { AiOutlineCheck, AiOutlineSearch } from "react-icons/ai";

const ImageDoctor = () => {
  // const [selectedImages, setSelectedImages] = useState([]);
  // const [selectedCount, setSelectedCount] = useState(0);
  // const [selectedCell, setSelectedCell] = useState(null);
  // const [excelUrl, setExcelUrl] = useState("");
  // const [excelName, setExcelName] = useState("");
  // const [selectedOriginalImage, setSelectedOriginalImage] = useState("");

  useEffect(() => {
    const script2 = document.createElement("script");
    script2.src = "/scripts/image-doctor.js";

    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script2);
    };
  }, []);

  // const onUploadClick = (cellNo, originalImage) => {
  // 	setSelectedCell(cellNo);
  // 	setSelectedOriginalImage(originalImage);
  // };

  // const removeImage = (id) => {
  // 	setSelectedImages((prevImages) =>
  // 		prevImages.map((image) => {
  // 			if (image.id === id) {
  // 				return { ...image, selected: false };
  // 			}
  // 			return image;
  // 		})
  // 	);
  // 	setSelectedCount((prevCount) => prevCount - 1);
  // };

  // const addImage = (url) => {
  // 	const body = [
  // 		{
  // 			SD: {
  // 				url: excelUrl,
  // 				sheetName: excelName,
  // 			},
  // 			cellNo: selectedCell,
  // 			cellSrc: url,
  // 		},
  // 	];

  // 	// Make AJAX request to upload the image and update the sheet

  // 	setSelectedImages((prevImages) =>
  // 		prevImages.map((image) => {
  // 			if (image.id === selectedCell) {
  // 				return { ...image, selected: true };
  // 			}
  // 			return image;
  // 		})
  // 	);
  // 	setSelectedCount((prevCount) => prevCount + 1);
  // };

  // const showToast = (text) => {
  // 	// Show toast notification
  // };

  // const showImageModal = (src) => {
  // 	// Show image modal with the selected image
  // };

  // const renderExistingImageCol = (url, cellNo, originalImage) => (
  // 	<div className='row'>
  // 		<button className='col btn btn-outline-secondary' onClick={() => showImageModal(url)}>
  // 			<span className='bi bi-eye'></span>
  // 		</button>
  // 		<button
  // 			id={`upload-${cellNo}`}
  // 			className='col btn btn-outline-secondary'
  // 			onClick={() => onUploadClick(cellNo, originalImage)}
  // 		>
  // 			<span className='bi bi-pencil-square'></span>
  // 		</button>
  // 	</div>
  // );

  // const renderBlankImageCol = (cellNo, originalImage) => (
  // 	<div className='flex justify-center'>
  // 		<button
  // 			id={`upload-${cellNo}`}
  // 			className='btn btn-outline-secondary'
  // 			onClick={() => onUploadClick(cellNo, originalImage)}
  // 		>
  // 			<span className='bi bi-upload'></span>
  // 		</button>
  // 	</div>
  // );

  // const exportToExcel = () => {
  // 	if (selectedCount < 3) {
  // 		showToast("Please select at least 3 images");
  // 		return;
  // 	}
  // 	// Export selected images to Excel
  // };

  // const readExcel = () => {
  // 	if (!excelName || !excelUrl) {
  // 		showToast("Excel name and excel url must be provided!");
  // 		return;
  // 	}
  // 	const body = { url: excelUrl, sheetName: excelName };
  // };

  return (
    <>
      <div className="row p-4">
        <div className="col-md-4">
          <div className="row justify-between">
            <div className="col-md-6">
              <div className="text-center text-danger mb-2">
                <h1 className="text-2xl mt-2">Read excel</h1>
              </div>
              <div className="row mb-2">
                <input
                  id="excel-url"
                  type="text"
                  className="form-control border border-warning mb-2"
                  placeholder="Excel url"
                />
                <input
                  id="excel-name"
                  type="text"
                  className="form-control border border-warning mb-2"
                  placeholder="Excel name"
                />
                <button
                  name="read"
                  id="read-excel"
                  className="btn btn-warning btn-outline"
                >
                  Read
                </button>
              </div>
            </div>
            <div id="original-image" className="hidden col-md-6">
              <img alt="original-image" className=" h-[180px]" />
            </div>
          </div>
          <div className="row hidden mb-2 gap-2" id="excel-header">
            <span className="col-2">#</span>
            <span className="col-3">Dishname</span>
            <span className="col-2">V1</span>
            <span className="col-2">V2</span>
            <span className="col-2">V3</span>
          </div>
          <div className="row" id="excel-data"></div>
        </div>
        <div id="search-image" className="col-md-8">
          <div className="text-center text-danger">
            <h1 className="text-2xl mt-2">Image search Page</h1>
          </div>
          <br />
          <div className="row items-end " style={{ marginLeft: "3rem" }}>
            {/* <div class="col-md-2"></div> */}
            <div className="col-md-12 row items-end mb-2">
              <div className="col-md-6 input-group w-50 text-center mb-2">
                <input
                  id="variation-input"
                  type="text"
                  className="form-control border border-warning"
                  placeholder="Paste url to make variations"
                />
                <button
                  id="variation-call"
                  className="btn btn-outline btn-warning"
                  type="button"
                >
                  <AiOutlineSearch size={24} />
                </button>
              </div>
              <div className="col-md-6 input-group w-50 text-center mb-2">
                <input
                  id="bg-change-url"
                  type="text"
                  className="form-control border border-warning"
                  placeholder="Paste image url to change background"
                />
                <input
                  id="bg-change-prompt"
                  type="text"
                  className="form-control border border-warning"
                  placeholder="Prompt about background"
                />
                <button
                  id="bg-call"
                  className="btn btn-outline btn-warning"
                  type="button"
                >
                  <AiOutlineSearch size={24} />
                </button>
              </div>
            </div>
            <div className="col-md-4 row">
              <div className="col-md-10">
                <span className="text-secondary">
                  {" "}
                  Select your Image Search option:
                </span>
                <br />
                <div className="d-inline-flex mt-2">
                  <select id="option" className="form-control mr-2">
                    <option value="">Please select Search Option</option>
                    <option value="AI">AI Creation</option>
                    <option value="google">Google Search</option>
                    <option value="db">Database Search</option>
                  </select>
                  <button
                    id="ok"
                    className="btn btn-warning btn-outline"
                    type="button"
                  >
                    <AiOutlineCheck size={24} />
                  </button>
                </div>
              </div>
              {/* <div class="col-md-2"></div> */}
            </div>
            {/* <br /> */}
            <div id="ai" className="col-md-8 " style={{ display: "none" }}>
              <h3 className="text-center text-info text-xl mb-1">
                Create Image by AI
              </h3>
              <h5 className="text-center text-secondary mb-2 mb-1">
                To make perfect image write your text more specifically
              </h5>
              <div className="row justify-center">
                {"{"}# <div className="col-md-3" />#{"}"}
                <div className="input-group w-50 text-center">
                  <input
                    id="request"
                    type="text"
                    className="form-control border border-warning"
                    placeholder="Search from AI"
                  />
                  <button
                    id="AiCall"
                    className="btn btn-warning btn-outline"
                    type="button"
                  >
                    <span className="bi bi-search" />
                  </button>
                </div>
              </div>
            </div>
            <div id="db" className="col-md-8 row " style={{ display: "none" }}>
              <div className="d-flex flex-wrap justify-content-center">
                <div className="text-center text-info col-md-12 mb-1">
                  <h3 className="text-xl">Find your desired Image</h3>
                </div>
                <div className="col-md-6 d-inline-flex ">
                  <select id="categoryText" className="form-control mr-2">
                    <option value="">Please select category</option>
                    <option value="Indian">Indian</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Korean">Korean</option>
                    <option value="Dessert">Dessert</option>
                    <option value="yougrt">yougrt</option>
                    <option value="Ice">Ice</option>
                    <option value="Maxican">Maxican</option>
                    <option value="japanese">japanese</option>
                    <option value="Shwarma">Shwarma</option>
                    <option value="Middle Eastern">Middle Eastern</option>
                  </select>
                  <div className="input-group">
                    <input
                      id="searchText"
                      type="text"
                      className="form-control"
                      placeholder="Search"
                    />
                    <button
                      id="search"
                      className="btn btn-warning btn-outline"
                      type="button"
                    >
                      <AiOutlineSearch size={24} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div id="google" className="col-md-8" style={{ display: "none" }}>
              <div className="gcse-search" style={{ paddingTop: "1rem" }}>
                <div className="input-group">
                  <input
                    id="ser"
                    type="text"
                    className="form-control"
                    placeholder="Search from web"
                  />
                  <button
                    id="web"
                    className="btn btn-warning btn-outline"
                    type="button"
                  >
                    <span className="bi bi-search" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="row px-2 align-items-start justify-center">
            <div
              className="row col-md-12 flex-wrap border-secondary justify-content-center gap-2"
              id="modified-bg-container"
            ></div>
          </div>
          <div className="row px-2 align-items-start justify-center">
            <div
              className="row col-md-12 flex-wrap border-secondary justify-content-center gap-2"
              id="image-variation-container"
            ></div>
          </div>
          <div className="row px-2 align-items-start justify-center">
            <div
              className="row col-md-12 flex-wrap border-secondary justify-content-center gap-2"
              id="image-container"
            ></div>
          </div>
        </div>
      </div>
      {/* Toast  */}
      <div
        id="alert-toast"
        className="toast fixed right-2 top-2 bg-primary align-items-center text-white bg-primary border-0"
        role="alert"
        aria-live="polite"
        aria-atomic="true"
        data-bs-delay={4000}
      >
        <div className="d-flex">
          <div className="toast-body"></div>
        </div>
      </div>
      {/* Image modal */}
      <div
        className="modal fade"
        id="image-modal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="image-modal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <img id="viewed-image" alt="viewed_image" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageDoctor;
