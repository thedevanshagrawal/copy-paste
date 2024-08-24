import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HomePage from "./components/HomePage/HomePage";
import Copy from "./components/Copy";
import Paste from "./components/Paste";

function App() {
  return (
    <div className="fullContainer">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/copy" element={<Copy />} />
          <Route path="/paste" element={<Paste />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
