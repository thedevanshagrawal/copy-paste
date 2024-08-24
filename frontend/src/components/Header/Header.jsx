import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav>
      <div className="leftHeaderSection">Copy Paste Website</div>
      <div className="rightHeaderSection">
        <ul>
          <Link to="/">Home</Link>
          <Link to="/copy">Copy</Link>
          <Link to="/paste">Paste</Link>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
