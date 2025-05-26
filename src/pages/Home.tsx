import React, { useEffect, useState } from "react";
import ArtistCard from "../components/ArtistCard";
import TrackCard from "../components/TrackCard";
import { Artist, Track } from "../types";
import { fetchLastFm } from "../api/lastfm";
import "./Home.css"

const PLACEHOLDER = "/images/placeholder.jpg"; 

/**
 * Главная страница приложения: отображает список популярных исполнителей и треков.
 *
 * @component
 * @returns {JSX.Element} Главная страница с блоками "Hot right now" и "Popular tracks".
 */
const Home: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   * Загружает топ-артистов и топ-треки с помощью Last.fm API.
   * Обновляет состояния artists и tracks.
   *
   * @async
   * @function loadData
   * @returns {Promise<void>}
   */
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        // Получаем топ-артистов
        const dataArtists = await fetchLastFm<any>("chart.gettopartists", { limit: 12 });
        setArtists(
          dataArtists.artists.artist.map((a: any) => ({
            name: a.name,
            img: a.image?.[2]?.['#text'] || PLACEHOLDER,
            genre: "", 
          }))
        );
        // Получаем топ-треки
        const dataTracks = await fetchLastFm<any>("chart.gettoptracks", { limit: 18 });
        setTracks(
          dataTracks.tracks.track.map((t: any) => ({
            title: t.name,
            artist: t.artist.name,
            img: t.image?.[2]?.['#text'] || PLACEHOLDER,
            meta: "", 
          }))
        );
      } catch (e) {
        setArtists([]);
        setTracks([]);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  // Разбиваем треки на 3 колонки
  const columns = [
    tracks.slice(0, 6),
    tracks.slice(6, 12),
    tracks.slice(12, 18)
  ];

  return (
    <main className="main">
      <h1 className="main-title">Music</h1>
      <section className="hot-section">
        <h2 className="section-title">Hot right now</h2>
        <ul className="hot-artists-list">
          {loading
            ? Array.from({ length: 12 }).map((_, i) => (
                <ArtistCard key={i} name="Loading..." img={PLACEHOLDER} />
              ))
            : artists.map((artist) => (
                <ArtistCard key={artist.name} {...artist} />
              ))}
        </ul>
      </section>
      <section className="tracks-section">
        <h2 className="section-title">Popular tracks</h2>
        <div className="popular-tracks-lists">
          {columns.map((column, i) => (
            <ul className="tracks-list" key={i}>
              {loading
                ? Array.from({ length: 6 }).map((_, j) => (
                    <TrackCard key={j} title="Loading..." artist="" img={PLACEHOLDER} />
                  ))
                : column.map((track) => (
                    <TrackCard key={track.title + track.artist} {...track} />
                  ))}
            </ul>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
