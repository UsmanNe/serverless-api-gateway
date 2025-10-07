import { useState } from "react";
import HomePage from "./screens/HomePage";
import Header from "./layout/header";
import Sidebar from "./layout/sidebar";
import "./index.css";
import { Button } from "react-bootstrap";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="app-layout">
      <Header onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <Sidebar />
      </div>

      <div className="main-content">
        <HomePage />
      </div>

      {isSidebarOpen && window.innerWidth < 992 && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1010,
          }}
        />
      )}
    </div>
  );
};

export default App;
