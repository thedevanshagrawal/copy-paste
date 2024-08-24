import React, { useState } from "react";
import axios from "axios";
import "./Paste.css";

function Paste() {
  const [userText, setUserText] = useState("");
  const [uniqueText, setUniqueText] = useState("");
  const [error, setError] = useState("");

  const sendUserData = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://copy-paste-backend.onrender.com/api/v1/users/usercopieddata",
        {
          userText,
          uniqueText,
        }
      );
      setUniqueText(response.data.uniqueText); // Assuming the response structure is { data: { userText: "..." } }
      setError("");
    } catch (err) {
      // setError("Error in retrieving data: " + err.message);
      setUniqueText("");
    }
  };

  console.log("userText: ", userText);
  console.log("uniqueText: ", uniqueText);

  return (
    <div className="Content-Main-Container">
      <div className="Contentcontainer">
        <div className="Contentform-container">
          <form id="Content-form" onSubmit={sendUserData}>
            <label htmlFor="inputData" className="Contentform-label">
              Enter Your text:
            </label>
            <textarea
              name="inputData"
              id="inputData"
              className="Contentform-input Contentform-getData"
              placeholder="Enter your text"
              onChange={(e) => setUserText(e.target.value)}
            ></textarea>

            <label htmlFor="getData" className="Contentform-label">
              Your Unique Id :
            </label>
            <input
              type="text"
              id="getData"
              name="getData"
              readOnly
              className="Contentform-input"
              value={uniqueText}
            />

            <button type="submit" className="Contentform-button">
              Submit
            </button>

            {error && <p className="Contentform-error">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Paste;
