import React from "react";
import { Link } from "react-router-dom";
import "./layout.css";

export default function Layout({ children }) {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container container">
          <input type="checkbox" name="" id="" />
          <div className="hamburger-lines">
            <span className="line line1"></span>
            <span className="line line2"></span>
            <span className="line line3"></span>
          </div>
          <ul className="menu-items">
            <li>
              <Link to="/lectures">Paskaitos</Link>
            </li>
            <li>
              <Link to="/bhajans">Bhadžanai</Link>
            </li>
            <li>
              <Link to="/kirtans">Kirtanai</Link>
            </li>
          </ul>
          <h1 className="logo">
            <a href="/">Prabhupada.lt</a>
          </h1>
        </div>
      </nav>
      <section className="section">{children}</section>
    </>
  );
}
