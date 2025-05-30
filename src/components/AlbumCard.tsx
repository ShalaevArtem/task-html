import React from "react";
import { Album } from "../types";

/**
 * Компонент для отображения карточки альбома.
 *
 * @component
 * @param {Album} props - Данные альбома: имя, исполнитель, обложка.
 * @param {string} props.name - Название альбома.
 * @param {string} props.artist - Имя исполнителя.
 * @param {string} props.img - URL обложки альбома.
 * @returns {JSX.Element} Карточка альбома для отображения в списке.
 */
const AlbumCard: React.FC<Album> = ({ name, artist, img }) => (
  <li className="album-card">
    <img src={img} alt={name} className="album-img" />
    <div className="album-title">{name}</div>
    <div className="album-meta">{artist}</div>
  </li>
);

export default AlbumCard;
