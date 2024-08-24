import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <main>
      <div className="leftHomePage">
        <img
          src="https://img.freepik.com/free-vector/hand-drawn-essay-illustration_23-2150268421.jpg?ga=GA1.1.561287211.1717401751&semt=ais_hybrid"
          alt=""
        />
      </div>
      <div className="rightHomePage">
        <h1>Copy Paste</h1>
        <p>
          On this website, you can paste your text and receive a unique ID. This
          ID can be shared with anyone, allowing them to easily retrieve the
          text by using the same ID. The system ensures that your content is
          accessible to others without the need for long URLs or complex sharing
          methods, making it a convenient way to share information quickly and
          securely.
        </p>
        <div className="HomePageBtnDiv">
          <Link to="/copy">Copy</Link>
          <Link to="/paste">Paste</Link>
        </div>
      </div>
    </main>
  );
}

export default HomePage;