import React from "react";
import "./Footer.css";

/**
 * Компонент для отображения футера сайта.
 *
 * @component
 * @returns {JSX.Element} Футер с колонками ссылок, языком, временем и копирайтом.
 */
const Footer: React.FC = () => (
  <footer className="footer">
    <div className="footer-columns">
      <div>
        <b>Company</b><br />
        About Last.fm<br />
        Contact Us<br />
        Jobs
      </div>
      <div>
        <b>Help</b><br />
        Track My Music<br />
        Community Support<br />
        Community Guidelines<br />
        Help
      </div>
      <div>
        <b>Goodies</b><br />
        Download Scrobbler<br />
        Developer API<br />
        Free Music Downloads<br />
        Merchandise
      </div>
      <div>
        <b>Account</b><br />
        Inbox<br />
        Settings<br />
        Last.fm Pro<br />
        Logout
      </div>
      <div>
        <b>Follow Us</b><br />
        Facebook<br />
        Twitter<br />
        Instagram<br />
        YouTube
      </div>
    </div>
    <div className="footer-bottom">
      <div>English ... Time zone: Europe/Moscow</div>
      <div>&copy; 2025 Last.fm mini. Дипломный проект.</div>
    </div>
  </footer>
);

export default Footer;
