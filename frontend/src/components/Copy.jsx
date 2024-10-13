import React, { useState } from "react";
import axios from "axios";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import "./Paste.css";

function Copy() {
  const [userText, setUserText] = useState("");
  const [imageUrls, setImageUrls] = useState([]); // Array of image URLs
  const [uniqueText, setUniqueText] = useState("");
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false); // To handle download state

  // Function to handle downloading text as a .txt file
  const downloadText = () => {
    const element = document.createElement("a");
    const file = new Blob([userText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `copied_text_${uniqueText}.txt`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };

  // Function to handle downloading a single image
  const downloadImage = async (url, index) => {
    try {
      // Fetch the image as a Blob
      const response = await fetch(url, { mode: 'cors' });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();

      // Create a Blob URL
      const blobUrl = window.URL.createObjectURL(blob);

      // Create a temporary anchor element and trigger the download
      const link = document.createElement("a");
      link.href = blobUrl;
      // Extract the file extension from the URL
      const extension = url.substring(url.lastIndexOf('.'));
      link.download = `uploaded_image_${uniqueText}_${index + 1}${extension}`;
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading image:", error);
      alert("Failed to download image. Please try again.");
    }
  };

  // Function to handle downloading all images as a ZIP
  const downloadAllImages = async () => {
    if (imageUrls.length === 0) {
      alert("No images to download.");
      return;
    }

    setDownloading(true); // Start download process

    const zip = new JSZip();
    const imgFolder = zip.folder("images"); // Create a folder named 'images' in the ZIP

    try {
      // Array to hold all image fetch promises
      const fetchPromises = imageUrls.map(async (url, index) => {
        const response = await fetch(url, { mode: 'cors' });
        if (!response.ok) {
          throw new Error(`Failed to fetch image ${index + 1}`);
        }
        const blob = await response.blob();
        const extension = url.substring(url.lastIndexOf('.'));
        const filename = `uploaded_image_${uniqueText}_${index + 1}${extension}`;
        imgFolder.file(filename, blob);
      });

      // Wait for all images to be fetched and added to the ZIP
      await Promise.all(fetchPromises);

      // Generate the ZIP file
      const zipBlob = await zip.generateAsync({ type: "blob" });

      // Trigger the download
      saveAs(zipBlob, `images_${uniqueText}.zip`);
    } catch (err) {
      console.error("Error creating ZIP:", err);
      alert("Failed to download all images. Please try again.");
    } finally {
      setDownloading(false); // End download process
    }
  };

  const getUserData = async (event) => {
    event.preventDefault();

    if (!uniqueText) {
      setError("Unique ID is required");
      return;
    }

    try {
      const response = await axios.post("https://copy-paste-backend.onrender.com/api/v1/users/getusercopieddata", {
        uniqueText,
      });

      const data = response.data.data;

      if (data) {
        setUserText(data.userText || "");
        setImageUrls(data.imageData || []);
        setError("");
      } else {
        setUserText("");
        setImageUrls([]);
        setError("No data found for the provided Unique ID");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error in retrieving data");
      setUserText("");
      setImageUrls([]);
    }
  };

  return (
    <div className="Content-Main-Container">
      <div className="Contentcontainer">
        <div className="Contentform-container">
          <form id="Content-form" onSubmit={getUserData}>
            <label htmlFor="getData" className="Contentform-label">
              Your Text:
            </label>
            <textarea
              value={userText}
              name="getData"
              id="getData"
              className="Contentform-input Contentform-getData"
              readOnly
            ></textarea>

            {imageUrls.length > 0 && (
              <div className="ImageDataContainer">
                {imageUrls.map((url, index) => (
                  <div key={index} className="ImageContainer">
                    <img
                      className="Contentform-input"
                      src={url}
                      alt={`Uploaded ${index + 1}`}
                      style={{ maxWidth: "300px", marginTop: "10px" }}
                    />
                    <button
                      type="button"
                      className="Download-button"
                      onClick={() => downloadImage(url, index)}
                      style={{ marginTop: "5px" }}
                    >
                      Download Image {index + 1}
                    </button>
                  </div>
                ))}
              </div>
            )}

            <label htmlFor="inputData" className="Contentform-label">
              Paste Your ID Here:
            </label>
            <input
              type="text"
              id="inputData"
              name="inputData"
              className="Contentform-input"
              placeholder="Paste your ID here"
              value={uniqueText}
              onChange={(e) => setUniqueText(e.target.value)}
              required
            />

            <button type="submit" className="Contentform-button">
              Submit
            </button>

            {error && <p className="Contentform-error">{error}</p>}
          </form>

          {/* Download Buttons */}
          {userText && (
            <div className="DownloadButtons">
              <button onClick={downloadText} className="Download-button">
                Download Text
              </button>
              <button
                onClick={downloadAllImages}
                className="Download-button"
                disabled={downloading}
              >
                {downloading ? "Preparing Download..." : "Download All Images"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Copy;
