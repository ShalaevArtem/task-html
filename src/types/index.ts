/**
 * Описывает исполнителя для отображения на сайте.
 *
 * @property {string} name - Имя исполнителя.
 * @property {string} [genre] - Жанр исполнителя или его описание.
 * @property {string} img - URL изображения исполнителя.
 * @property {number} [listeners] - Количество слушателей.
 */
export interface Artist {
  name: string;
  genre?: string;
  img: string;
  listeners?: number;
}

/**
 * Описывает трек для отображения на сайте.
 *
 * @property {string} title - Название трека.
 * @property {string} artist - Имя исполнителя.
 * @property {string} img - URL изображения трека.
 * @property {string} [meta] - Дополнительная информация о треке (жанр, год и т.д.).
 * @property {string} [duration] - Длительность трека.
 */
export interface Track {
  title: string;
  artist: string;
  img: string;
  meta?: string;
  duration?: string;
}

/**
 * Описывает альбом для отображения на сайте.
 *
 * @property {string} name - Название альбома.
 * @property {string} artist - Имя исполнителя альбома.
 * @property {string} img - URL изображения альбома.
 */
export interface Album {
  name: string;
  artist: string;
  img: string;
}
