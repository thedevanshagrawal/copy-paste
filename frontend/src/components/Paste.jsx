import React, { useState } from "react";
import axios from "axios";
import "./Paste.css";

function Paste() {
  const [userText, setUserText] = useState("");
  const [imageFiles, setImageFiles] = useState([]); // Updated to handle multiple images
  const [uniqueText, setUniqueText] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const sendUserData = async (event) => {
    event.preventDefault();

    if (!userText) {
      setError("Text is required");
      return;
    }

    const formData = new FormData();
    formData.append("userText", userText);
    if (imageFiles.length > 0) {
      imageFiles.forEach((file) => {
        formData.append("imageData", file); // Append each image file
      });
    }

    try {
      setUploading(true);
      const response = await axios.post("https://copy-paste-backend.onrender.com/api/v1/users/usercopieddata", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUniqueText(response.data.data.uniqueText);
      setError("");
      setUserText("");
      setImageFiles([]);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error in submitting data");
      setUniqueText("");
    } finally {
      setUploading(false);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
  };

  return (
    <div className="Content-Main-Container">
      <div className="Contentcontainer">
        <div className="Contentform-container">
          <form id="Content-form" onSubmit={sendUserData}>
            <label htmlFor="inputData" className="Contentform-label">
              Enter Your Text:
            </label>
            <textarea
              name="inputData"
              id="inputData"
              className="Contentform-input Contentform-getData"
              placeholder="Enter your text"
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              required
            ></textarea>

            <label htmlFor="imageData" className="Contentform-label">
              Choose Your Files:
            </label>
            <input
              type="file"
              name="imageData"
              id="imageData"
              className="Contentform-input Contentform-getData"
              accept="image/*"
              multiple // Allow multiple file selection
              onChange={handleImageChange}
            />

            <label htmlFor="getData" className="Contentform-label">
              Your Unique ID:
            </label>
            <input
              type="text"
              id="getData"
              name="getData"
              readOnly
              className="Contentform-input"
              value={uniqueText}
            />

            <button type="submit" className="Contentform-button" disabled={uploading}>
              {uploading ? "Uploading..." : "Submit"}
            </button>

            {error && <p className="Contentform-error">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Paste;
