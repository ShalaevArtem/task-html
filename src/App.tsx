import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Header from "./components/Header";
import Footer from "./components/Footer";

/**
 * Корневой компонент приложения.
 * Организует роутинг между главной страницей и страницей поиска,
 * а также отображает общий Header и Footer для всех страниц.
 *
 * @component
 * @returns {JSX.Element} Приложение с навигацией и основными разделами.
 */
const App: React.FC = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default App;
