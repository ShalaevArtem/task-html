import React from "react";
import { Track } from "../types";

/**
 * Компонент для отображения карточки трека.
 *
 * @component
 * @param {Track} props - Данные трека: название, исполнитель, обложка, дополнительная информация.
 * @param {string} props.title - Название трека.
 * @param {string} props.artist - Имя исполнителя.
 * @param {string} props.img - URL обложки трека.
 * @param {string} [props.meta] - Дополнительная информация (например, жанр или длительность).
 * @returns {JSX.Element} Карточка трека для отображения в списке.
 */
const TrackCard: React.FC<Track> = ({ title, artist, img, meta }) => (
  <li className="track-card">
    <img src={img} alt={title} className="track-img" />
    <div>
      <div className="track-title">{title}</div>
      <div className="track-meta">
        {artist} {meta && <span>• {meta}</span>}
      </div>
    </div>
  </li>
);

export default TrackCard;
