import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { House, Speedometer2, QuestionCircle } from "react-bootstrap-icons";

export default function Sidebar() {
  const links = [
    { name: "Home", icon: <House size={18} />, path: "/" },
    { name: "Dashboard", icon: <Speedometer2 size={18} />, path: "/dashboard" },
    {
      name: "Support Centre",
      icon: <QuestionCircle size={18} />,
      path: "/support",
    },
  ];

  return (
    <div
      className="d-flex flex-column h-100 p-3"
      style={{ width: "220px", backgroundColor: "#f8f9fa" }}
    >
      <p className="text-uppercase fw-bold text-secondary mb-4">Admin Panel</p>

      <Nav className="flex-column gap-2">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `d-flex align-items-center gap-2 px-3 py-2 rounded text-decoration-none ${
                isActive
                  ? "bg-dark text-white fw-bold"
                  : "text-dark nav-hover"
              }`
            }
          >
            {link.icon}
            <span>{link.name}</span>
          </NavLink>
        ))}
      </Nav>

      <div className="mt-auto pt-3 border-top">
        <div className="d-flex align-items-center gap-2">
          <img
            src="https://images.pexels.com/photos/1666779/pexels-photo-1666779.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Usman Naeem"
            className="rounded-circle"
            style={{ width: "40px", height: "40px" }}
          />
          <span className="fw-semibold">Usman Naeem</span>
        </div>
      </div>
    </div>
  );
}
