import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ArtistCard from "../components/ArtistCard";
import AlbumCard from "../components/AlbumCard";
import { fetchLastFm } from "../api/lastfm";
import { Artist, Album, Track } from "../types";
import "./Search.css"

const PLACEHOLDER = "/images/placeholder.jpg";

const artistPlaceholders: Artist[] = Array.from({ length: 8 }, () => ({
  name: "Loading...",
  img: PLACEHOLDER,
  listeners: undefined,
}));

const albumPlaceholders: Album[] = Array.from({ length: 8 }, () => ({
  name: "Loading...",
  artist: "",
  img: PLACEHOLDER,
}));

const trackPlaceholders: Track[] = Array.from({ length: 10 }, () => ({
  title: "Loading...",
  artist: "",
  img: PLACEHOLDER,
  duration: "",
}));

/**
 * Страница поиска: отображает результаты поиска по артистам, альбомам и трекам.
 *
 * @component
 * @returns {JSX.Element} Страница поиска с результатами по введённому запросу.
 */
const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  const [artists, setArtists] = useState<Artist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);

  /**
   * Загружает результаты поиска по артистам, альбомам и трекам с помощью Last.fm API.
   * Обновляет состояния artists, albums и tracks.
   *
   * @async
   * @function
   * @returns {Promise<void>}
   */
  useEffect(() => {
    if (!initialQuery) return;
    setLoading(true);
    Promise.all([
      fetchLastFm<any>("artist.search", { artist: initialQuery, limit: 8 }),
      fetchLastFm<any>("album.search", { album: initialQuery, limit: 8 }),
      fetchLastFm<any>("track.search", { track: initialQuery, limit: 10 }),
    ])
      .then(([dataArtists, dataAlbums, dataTracks]) => {
        setArtists(
          Array.isArray(dataArtists.results.artistmatches.artist)
            ? dataArtists.results.artistmatches.artist.map((a: any) => ({
                name: a.name,
                img: a.image?.[2]?.['#text'] || PLACEHOLDER,
                listeners: a.listeners ? Number(a.listeners) : undefined,
              }))
            : []
        );
        setAlbums(
          Array.isArray(dataAlbums.results.albummatches.album)
            ? dataAlbums.results.albummatches.album.map((a: any) => ({
                name: a.name,
                artist: a.artist,
                img: a.image?.[2]?.['#text'] || PLACEHOLDER,
              }))
            : []
        );
        setTracks(
          Array.isArray(dataTracks.results.trackmatches.track)
            ? dataTracks.results.trackmatches.track.map((t: any) => ({
                title: t.name,
                artist: t.artist,
                img: t.image?.[2]?.['#text'] || PLACEHOLDER,
                duration: t.duration
                  ? `${Math.floor(Number(t.duration) / 60)}:${String(Number(t.duration) % 60).padStart(2, "0")}`
                  : "",
              }))
            : []
        );
      })
      .finally(() => setLoading(false));
  }, [initialQuery]);

  /**
   * Обрабатывает отправку формы поиска.
   *
   * @param {React.FormEvent} e - Событие отправки формы.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
    }
  };

  return (
    <main className="main">
      <h1 className="search-title">
        Search results for &quot;{initialQuery}&quot;
      </h1>
      <div className="search-tabs">
        <button type="button" className="tab active">Top Results</button>
        <button type="button" className="tab">Artists</button>
        <button type="button" className="tab">Albums</button>
        <button type="button" className="tab">Tracks</button>
      </div>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="Search for music"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type="submit" className="search-btn" aria-label="search">
          🔍
        </button>
      </form>

      {/* Artists Section */}
      <section className="search-artists-section">
        <h2 className="section-title">Artists</h2>
        <ul className="search-artists-list">
          {(loading ? artistPlaceholders : artists).map((artist, i) => (
            <ArtistCard
              key={i}
              name={artist.name}
              img={artist.img}
              listeners={artist.listeners}
            />
          ))}
        </ul>
        <button type="button" className="more-link">More artists &gt;</button>
      </section>

      {/* Albums Section */}
      <section className="search-albums-section">
        <h2 className="section-title">Albums</h2>
        <ul className="search-albums-list">
          {(loading ? albumPlaceholders : albums).map((album, i) => (
            <AlbumCard
              key={i}
              name={album.name}
              artist={album.artist}
              img={album.img}
            />
          ))}
        </ul>
        <button type="button" className="more-link">More albums &gt;</button>
      </section>

      {/* Tracks Section */}
      <section className="search-tracks-section">
        <h2 className="section-title">Tracks</h2>
        <table className="tracks-table">
          <tbody>
            {(loading ? trackPlaceholders : tracks).map((track, i) => (
              <tr key={i}>
                <td>▶️</td>
                <td>{track.title}</td>
                <td>{track.artist}</td>
                <td>{track.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" className="more-link">More tracks &gt;</button>
      </section>
    </main>
  );
};

export default Search;
