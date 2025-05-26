import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

/**
 * Компонент для отображения верхней панели сайта.
 *
 * @component
 * @returns {JSX.Element} Верхняя панель с логотипом, навигационным меню и профилем пользователя.
 */
const Header: React.FC = () => (
  <div className="topbar">
    <div className="topbar__logo">last.fm</div>
    <nav className="topbar__nav">
      <Link to="/">Home</Link>
      <Link to="/search">Search</Link>
      <button type="button" className="topbar__nav-btn">Live</button>
      <button type="button" className="topbar__nav-btn">Music</button>
      <button type="button" className="topbar__nav-btn">Charts</button>
      <button type="button" className="topbar__nav-btn">Events</button>
      <button type="button" className="topbar__nav-btn">Features</button>
      <div className="topbar__profile"></div>
    </nav>
  </div>
);

export default Header;
