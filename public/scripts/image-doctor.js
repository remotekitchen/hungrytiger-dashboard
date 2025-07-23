var selectedImages = [];
var selectedCount = 0;
var selectedCell, excelUrl, excelName, selectedOriginalImage;
const apiRoot = "http://api.hungry-tiger.com/api/image-generator/v1/";
function onUploadClick(cellNo, originalImage) {
  $(`#upload-${selectedCell}`).removeClass("bg-success text-white");

  selectedCell = cellNo;
  selectedOriginalImage = originalImage;

  $(".upload-image").removeClass("hidden");
  $(`#upload-${cellNo}`).addClass("bg-success text-white");
  const original = $("#original-image");
  if (originalImage) {
    original.removeClass("hidden");
    $("#original-image img").attr("src", originalImage);
  } else original.addClass("hidden");
}

function existingImageCol(url, cellNo, originalImage) {
  // console.log("existing cell");
  return `<div class="row" >
      <button class="col btn btn-warning btn-outline" onclick="showImageModal('${url}')">
        <span class="bi bi-eye"></span>
        </button>
        <button id="upload-${cellNo}" class="col btn btn-warning btn-outline" onclick="onUploadClick('${cellNo}', '${originalImage}')">
          <span class="bi bi-pencil-square"></span>
          </button></div>`;
}

function blankImageCol(cellNo, originalImage) {
  return `<div class="flex justify-center" >
       <button id="upload-${cellNo}" class="btn btn-warning btn-outline" onclick="onUploadClick('${cellNo}', '${originalImage}')">
      <span class="bi bi-upload"></span>
      </button>
      </div>
      `;
}
function showToast(text) {
  $("#alert-toast .toast-body").text(text);
  $("#alert-toast").toast("show");
}

function showImageModal(src) {
  $("#viewed-image").attr("src", src);
  $("#image-modal").modal("show");
}

function removeImage(id) {
  $(`#selected-${id}`).remove();
  selectedImages[id].selected = false;
  selectedCount--;
}

function addImage(url) {
  // console.log(url, selectedCell);
  const body = [
    {
      SD: {
        url: excelUrl,
        sheetName: excelName,
      },
      cellNo: selectedCell,
      cellSrc: url,
    },
  ];

  $.ajax({
    url: `${apiRoot}update-google-sheet/`,
    method: "POST",
    dataType: "json",
    data: JSON.stringify(body),
    contentType: "application/json",
    success: (data) => {
      showToast("Image uploaded successfully");
      $(`#cell-${selectedCell}`).html(
        existingImageCol(url, selectedCell, selectedOriginalImage)
      );
    },
    failure: (err) => {
      showToast("There was an error when uploading image");
      // console.log(err);
    },
  });
  $(".upload-image").addClass("hidden");
  $(".original-image").addClass("hidden");
}

function exportToExcel() {
  if (selectedCount < 3) {
    showToast("Please select at least 3 images");
    // alert('Please select at least 3 images');
    return;
  }
  const colFrom = $("#col-from").val(),
    colTo = $("#col-to").val(),
    dishname = $("#dishname").val();
  if (!colFrom || !colTo || !dishname) {
    showToast("Col from, Col to and Dishname must be provided");
    // alert('Col from, Col to and Dishname must be provided');
    return;
  }
  let images = {};
  selectedImages
    .filter((item) => item.selected)
    .forEach((item, index) => {
      images[`ImageV${index + 1}`] = item.url;
    });
  const body = {
    DishName: dishname,
    ...images,
  };

  $.ajax({
    url: `${apiRoot}update-google-sheet/${colFrom}/${colTo}/`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": "{{ csrf_token }}",
    },
    method: "POST",
    data: JSON.stringify(body),
    dataType: "json",
    success: (data) => {
      showToast("Image extracted");
      // alert('Image extracted');
      selectedCount = 0;
      selectedImages = [];
      $("#selected-images").html("");
    },
    error: (err) => {
      showToast("An error occurred while extracting!");
      // alert('An error occurred while extracting!');
    },
  });
}

const getKeyPrefixValue = (obj, prefix) =>
  Object.entries(obj).find(([k, v]) => k.startsWith(prefix));

$(document).ready(function () {
  $("#ok").click(function () {
    var option = $("#option").val();

    if (option == "AI") {
      document.getElementById("ai").style.display = "block";
      document.getElementById("google").style.display = "none";
      document.getElementById("db").style.display = "none";
    }
    if (option == "google") {
      document.getElementById("ai").style.display = "none";
      document.getElementById("google").style.display = "block";
      document.getElementById("db").style.display = "none";
    }
    if (option == "db") {
      document.getElementById("ai").style.display = "none";
      document.getElementById("google").style.display = "none";
      document.getElementById("db").style.display = "block";
    }
  });

  $("#search").click(function () {
    var searchText = $("#searchText").val();
    var Category = $("#categoryText").val();
    $.ajax({
      url: `${apiRoot}get-filtered-images/`,
      method: "Get",
      data: { category: Category, Searchquery: searchText },
      success: function (data) {
        $("#image-container").empty();
        if (data.length > 0) {
          const suggestedTitle = `<h3 id="suggested-title" class="text-xl text-center text-danger">
                                        Suggested images
                                      </h3>`;
          $("#image-container").append(suggestedTitle);
          $.each(data, function (index, value) {
            // Create a new image element with the src attribute set to the current URL
            var imgCard = `<div class="card m-2 p-0">
                                <div class="card-header text-info h-16 flex items-center">
                        ${value.dish}
                </div>
            <img class="m-auto h-[200px]" src="${value.url}" alt="Image" height="200">
            <div class="card-footer text-warning" >
                Match Rate-${value.match}%
            </div>
           </div>`;

            var cardElement = `<div class="col-md-4 row justify-content-center flex-wrap items-end">
                    ${imgCard}
                    <button class="col-md-4 btn btn-warning btn-outline select-btn hidden upload-image" onclick="addImage('${value.url}')">Click to upload</button>
                  </div>`;

            // Add the card element to the image container
            $("#image-container").append(cardElement);
          });
        } else {
          alert("No record avilable in Database");
        }
      },
      error: function (xhr, status, error) {
        // Code to execute when the AJAX request fails
      },
    });
  });

  $("#AiCall").click(function () {
    var searchText = $("#request").val();

    $.ajax({
      url: `${apiRoot}ai-image/`,
      method: "Get",
      data: { req: searchText },
      success: function (data) {
        // console.log($("#image-container"));
        $("#image-container").empty();
        // const dishList = set();
        if (data.length > 0) {
          const suggestedTitle = `<h3 id="suggested-title" class="text-xl text-center text-danger">
                                        Suggested images
                                      </h3>`;
          $("#image-container").append(suggestedTitle);
          $.each(data, function (index, value) {
            // Create a new image element with the src attribute set to the current URL
            var imgCard = `<div class="card m-2 p-0">
                                    <div class="card-header text-info h-16 flex items-center">
                                      ${value.dish}
                              </div>
                          <img class="m-auto h-[200px]" src="${value.url}" alt="Image" height="200">
                          <div class="card-footer text-warning" >
                              Match Rate-100%
                          </div>
                        </div>`;
            var cardElement = `<div class="col-md-4 row justify-content-center flex-wrap items-end">
                                  ${imgCard}
                                  <button class="upload-image col-md-4 btn btn-warning btn-outline select-btn hidden" onclick="addImage('${value.url}')">Click to upload</button>
                                </div>`;

            // Add the card element to the image container
            $("#image-container").append(cardElement);
          });
        } else {
          alert("No record avilable in Database");
        }
      },
      error: function (xhr, status, error) {
        // Code to execute when the AJAX request fails
      },
    });
  });
  ////search by category
  $("#searchCategory").click(function () {
    var searchText = $("#categoryText").val();
    $.ajax({
      url: `http://mrturjo-001-site1.atempurl.com/api/Images/GetImagesByCategory/${searchText}`,
      method: "Get",
      success: function (data) {
        $("#image-containerByCategory").empty();
        $.each(data, function (index, value) {
          // Create a new image element with the src attribute set to the current URL

          var imgCard = `<div class=" d-inline card mx-3 p-0">
                <img src="${value.url}" alt="Image" width="250" height="250">
                <div class="card-footer">
                    ${value.dish}
                </div>

            </div>`;
          var cardElement = `<div class="col-md-4 row justify-content-center flex-wrap">
                    ${imgCard}
                    <button class="col-md-3 btn btn-warning btn-outline select-btn" onclick="addImage('${value.url}')">select</button>
                  </div>`;

          // Add the card element to the image container
          $("#image-containerByCategory").append(cardElement);
        });
      },
      error: function (xhr, status, error) {
        // Code to execute when the AJAX request fails
      },
    });
  });

  ///goggle search
  $("#webSearch").click(function () {
    var searchText = $("#webSearchText").val();
    $.ajax({
      url: `${apiRoot}get-web-image-url/`,
      method: "get",
      success: function (data) {
        $("#image-container").empty();
        $.each(data, function (index, value) {
          // Create a new image element with the src attribute set to the current URL

          var cardElement = `<div class=" d-inline card mx-3 ">
                    <img class="m-auto" src="${value.Items}" alt="Image" width="300" height="300">
                <div class="card-footer">
                    ${value.dish}
                </div>

            </div>`;

          // Add the card element to the image container
          $("#image-container").append(cardElement);
        });
      },
      error: function (xhr, status, error) {
        // Code to execute when the AJAX request
      },
    });
  });

  $("#read-excel").click(() => {
    // console.log("read excel");
    const url = $("#excel-url").val(),
      sheetName = $("#excel-name").val();
    (excelUrl = url), (excelName = sheetName);
    if (!sheetName || !url) {
      showToast("Excel name and excel url must be provided!");
      return;
    }
    const body = { url, sheetName };

    $.ajax({
      url: `${apiRoot}read-google-sheet/`,
      method: "POST",
      dataType: "json",
      data: JSON.stringify(body),
      contentType: "application/json",
      headers: {
        "X-CSRFToken": "{{ csrf_token }}",
      },
      success: (data) => {
        // console.log(data);
        $("#excel-header").removeClass("hidden");
        $("#excel-data").html("");
        data.slice(3).forEach((item, index) => {
          const dishname = getKeyPrefixValue(item, "A")[1];
          const originalImage = getKeyPrefixValue(item, "T")[1];
          const [cellv1, v1Image] = getKeyPrefixValue(item, "V");
          const [cellv2, v2Image] = getKeyPrefixValue(item, "W");
          const [cellv3, v3Image] = getKeyPrefixValue(item, "X");
          $("#excel-data").append(`
              <div class="row mb-2 gap-2">
                <span class="col-2">${index + 1}</span>
                <span class="col-3">${dishname}</span>
                <span class="col-2" id="cell-${cellv1}">
                  ${
                    v1Image
                      ? existingImageCol(v1Image, cellv1, originalImage)
                      : blankImageCol(cellv1, originalImage)
                  }
                </span>
                <span class="col-2" id="cell-${cellv2}">${
            v2Image
              ? existingImageCol(v2Image, cellv2, originalImage)
              : blankImageCol(cellv2, originalImage)
          }</span>
                <span class="col-2" id="cell-${cellv3}">${
            v3Image
              ? existingImageCol(v3Image, cellv3, originalImage)
              : blankImageCol(cellv3, originalImage)
          }</span>
              </div>
            `);
        });
      },
      failure: (err) => {
        showToast("Failed to read the sheet!!");
      },
    });
  });
  $("#variation-call").click(() => {
    const data = {
      req: $("#variation-input").val(),
    };
    // console.log(data);
    $.ajax({
      url: `${apiRoot}ai-image-variation/`,
      method: "POST",
      dataType: "json",
      data: JSON.stringify(data),
      contentType: "application/json",
      headers: {
        "X-CSRFToken": "{{ csrf_token }}",
      },
      success: (data) => {
        // console.log(data);
        const container = $("#image-variation-container");
        container.html("");
        const title = `<h3 class="text-xl" class="text-xl text-center text-danger">Image variations</h3>`;
        container.append(title);
        data.forEach((item, index) => {
          var imgCard = `<div class="card m-2 p-0">
                                    <div class="card-header text-info h-16 flex items-center">
                                      Variation ${index + 1}
                              </div>
                          <img class="m-auto h-[200px]" src="${
                            item.url
                          }" alt="Image" height="200">
                        </div>`;
          var cardElement = `<div class="col-md-4 row justify-content-center flex-wrap items-end">
                                  ${imgCard}
                                  <button class="upload-image col-md-4 btn btn-warning btn-outline select-btn hidden" onclick="addImage('${item.url}')">Click to upload</button>
                                </div>`;

          // Add the card element to the image container
          container.append(cardElement);
        });
      },
      failure: (err) => {},
    });
  });

  $("#bg-call").click(() => {
    const data = {
      imageUrl: $("#bg-change-url").val(),
      bgImageUrl: $("#bg-change-prompt").val(),
    };
    // console.log(data);
    $.ajax({
      url: `${apiRoot}change-bg/`,
      method: "POST",
      dataType: "json",
      data: JSON.stringify(data),
      contentType: "application/json",
      headers: {
        "X-CSRFToken": "{{ csrf_token }}",
      },
      success: (data) => {
        // console.log(data);
        const container = $("#modified-bg-container");
        container.html("");
        const title = `<h3 class="text-xl" class="text-xl text-center text-danger">Background variations</h3>`;
        container.append(title);
        data.forEach((item, index) => {
          var imgCard = `<div class="card m-2 p-0">
                                    <div class="card-header text-info h-16 flex items-center">
                                      Variation ${index + 1}
                              </div>
                          <img class="m-auto h-[200px]" src="${item}" alt="Image" height="200">
                        </div>`;
          var cardElement = `<div class="col-md-4 row justify-content-center flex-wrap items-end">
                                  ${imgCard}
                                  <button class="upload-image col-md-4 btn btn-warning btn-outline select-btn hidden" onclick="addImage('${item}')">Click to upload</button>
                                </div>`;

          // Add the card element to the image container
          container.append(cardElement);
        });
      },
      failure: (err) => {},
    });
  });
});
