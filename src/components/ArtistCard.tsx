import React from "react";
import { Artist } from "../types";

/**
 * Компонент для отображения карточки исполнителя.
 *
 * @component
 * @param {Artist} props - Данные исполнителя: имя, жанр, изображение, количество слушателей.
 * @param {string} props.name - Имя исполнителя.
 * @param {string} [props.genre] - Жанр или описание исполнителя.
 * @param {string} props.img - URL изображения исполнителя.
 * @param {number} [props.listeners] - Количество слушателей.
 * @returns {JSX.Element} Карточка исполнителя для отображения в списке.
 */
const ArtistCard: React.FC<Artist> = ({ name, genre, img, listeners }) => (
  <li className="artist-card">
    <img src={img} alt={name} className="artist-img" />
    <div className="artist-name">{name}</div>
    <div className="artist-meta">
      {genre ? genre : listeners !== undefined ? `${listeners} listeners` : ""}
    </div>
  </li>
);

export default ArtistCard;
