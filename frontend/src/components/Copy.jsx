import React, { useState } from "react";
import axios from "axios";
import "./Paste.css";

function Copy() {
  const [userText, setUserText] = useState("");
  const [uniqueText, setUniqueText] = useState("");
  const [error, setError] = useState("");

  const getUserData = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://copy-paste-backend.onrender.com/api/v1/users/getusercopieddata", {
        uniqueText,
      });
      setUserText(response.data.data.userText); // Assuming the response structure is { data: { userText: "..." } }
      setError("");
    } catch (err) {
      // setError("Error in retrieving data: " + err.message);
      alert("You have enter wrong Id");
      setUserText("");
    }
  };

  return (
    <div className="Content-Main-Container">
      <div className="Contentcontainer">
        <div className="Contentform-container">
          <form id="Content-form" onSubmit={getUserData}>
            <label htmlFor="getData" className="Contentform-label">
              Your text:
            </label>
            <textarea
              value={userText}
              name="getData"
              id="getData"
              className="Contentform-input Contentform-getData"
              readOnly
            ></textarea>

            <label htmlFor="inputData" className="Contentform-label">
              Paste your ID here:
            </label>
            <input
              type="text"
              id="inputData"
              name="inputData"
              className="Contentform-input"
              placeholder="Paste your ID here"
              value={uniqueText}
              onChange={(e) => setUniqueText(e.target.value)}
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

export default Copy;
