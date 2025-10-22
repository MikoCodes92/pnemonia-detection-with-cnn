//// JavaScript code for handling image upload and processing
//
//// Function to handle file selection and display the image
//function handleFileSelect(event) {
//  const file = event.target.files[0];
//  const reader = new FileReader();
//
//  reader.onload = function (e) {
//    const imgPreview = document.getElementById("image-preview");
//    imgPreview.src = e.target.result;
//    imgPreview.classList.remove("hidden");
//  };
//
//  reader.readAsDataURL(file);
//}
//
//// Function to clear the selected image
//function clearImage() {
//  const fileUpload = document.getElementById("file-upload");
//  const imgPreview = document.getElementById("image-preview");
//  const uploadCaption = document.getElementById("upload-caption");
//
//  fileUpload.value = "";
//  imgPreview.src = "";
//  imgPreview.classList.add("hidden");
//  uploadCaption.innerHTML = "Drop image here or click to select";
//}
//
//// Function to submit the image for processing
//function submitImage() {
//  const fileUpload = document.getElementById("file-upload");
//  const panel = document.getElementById("panel");
//  const imgDisplay = document.getElementById("image-display");
//  const predResult = document.getElementById("pred-result");
//  const loader = document.getElementById("loader");
//
//  if (!fileUpload.files || !fileUpload.files[0]) {
//    return;
//  }
//
//  // Show loader while processing
//  loader.classList.remove("hidden");
//
//  // Display selected image
//  const reader = new FileReader();
//  reader.onload = function (e) {
//    imgDisplay.src = e.target.result;
//    imgDisplay.style.maxWidth = "50%"; // Set the maximum width to 50% of the container
//    imgDisplay.style.height = "auto"; // Automatically adjust the height
//    imgDisplay.style.display = "block"; // Set the display to block to center the image
//    imgDisplay.style.margin = "0 auto"; // Set margin to auto to center the image horizontally
//    imgDisplay.style.border = "10px solid black"; // Add a 1px solid black border
//  };
//  reader.readAsDataURL(fileUpload.files[0]);
//
//  // Simulate processing delay
//  setTimeout(() => {
//    // Hide loader after processing
//    loader.classList.add("hidden");
//
//     // Display prediction result
//    predResult.innerHTML = "Prediction: Pneumonia";
//    predResult.classList.remove("hidden");
//    predResult.style.fontSize = "24px"; // Make the prediction result big
//    predResult.style.textAlign = "center"; // Align the prediction result to the center
//    predResult.style.color = "gray"; // Set the color of the prediction result to gray
//  }, 2000);
//}
//
//// Add event listener for file selection
//const fileUpload = document.getElementById("file-upload");
//fileUpload.addEventListener("change", handleFileSelect);



// Function to handle file selection and display the image
function handleFileSelect(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const imgPreview = document.getElementById("image-preview");
    imgPreview.src = e.target.result;
    imgPreview.classList.remove("hidden");

    // Clear previous prediction result
    const predResult = document.getElementById("pred-result");
    predResult.innerHTML = "";
    predResult.classList.add("hidden");
  };

  reader.readAsDataURL(file);
}

// Function to clear the selected image
function clearImage() {
  const fileUpload = document.getElementById("file-upload");
  const imgPreview = document.getElementById("image-preview");
  const uploadCaption = document.getElementById("upload-caption");

  fileUpload.value = "";
  imgPreview.src = "";
  imgPreview.classList.add("hidden");
  uploadCaption.innerHTML = "Drop image here or click to select";

  // Clear previous prediction result
  const predResult = document.getElementById("pred-result");
  predResult.innerHTML = "";
  predResult.classList.add("hidden");
}

// Function to submit the image for processing
function submitImage() {
  const fileUpload = document.getElementById("file-upload");
  const imgDisplay = document.getElementById("image-display");
  const predResult = document.getElementById("pred-result");
  const loader = document.getElementById("loader");

  if (!fileUpload.files || !fileUpload.files[0]) {
    return;
  }

  // Show loader while processing
  loader.classList.remove("hidden");

  // Create a FormData object to send the file to the Flask endpoint
  const formData = new FormData();
  formData.append("file", fileUpload.files[0]);

  // Send the FormData object to the Flask endpoint
  fetch("/predict", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((result) => {
      // Hide loader after processing
      loader.classList.add("hidden");

      // Display prediction result
      predResult.innerHTML = "" + result;
      predResult.classList.remove("hidden");
      predResult.style.fontSize = "24px";
      predResult.style.textAlign = "center";
      predResult.style.color = "gray";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Add event listener for file selection
const fileUpload = document.getElementById("file-upload");
fileUpload.addEventListener("change", handleFileSelect);