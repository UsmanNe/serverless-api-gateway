import React, { useState } from "react";
import { Nav, Button } from "react-bootstrap";
import { House, Speedometer2, QuestionCircle } from "react-bootstrap-icons";

export default function Sidebar() {
  const [active, setActive] = useState("Home");

  const links = [
    { name: "Home", icon: <House size={18} /> },
    { name: "Dashboard", icon: <Speedometer2 size={18} /> },
    { name: "Support Centre", icon: <QuestionCircle size={18} /> },
  ];

  return (
    <div
      className="d-flex flex-column h-100 p-3"
      style={{ width: "220px", backgroundColor: "#f8f9fa" }}
    >
      <p className="text-uppercase fw-bold text-secondary mb-4">Admin Panel</p>

      <Nav className="flex-column gap-2">
        {links.map((link) => (
          <Nav.Link
            key={link.name}
            onClick={() => setActive(link.name)}
            active={active === link.name}
            className={`d-flex align-items-center gap-2 px-3 py-2 rounded ${
              active === link.name
                ? "bg-primary text-white fw-bold"
                : "text-dark nav-hover"
            }`}
            style={{ cursor: "pointer", transition: "all 0.2s" }}
          >
            {link.icon}
            <span>{link.name}</span>
          </Nav.Link>
        ))}
      </Nav>

      <div className="mt-auto pt-3 border-top">
        <div className="d-flex align-items-center gap-2">
          <img
            src="https://images.pexels.com/photos/1666779/pexels-photo-1666779.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Usman naeem"
            className="rounded-circle"
            style={{ width: "40px", height: "40px" }}
          />
          <span className="fw-semibold">Usman Naeem</span>
        </div>
      </div>
    </div>
  );
}
