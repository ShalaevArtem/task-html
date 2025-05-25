/**
 * Выполняет GET-запрос к Last.fm API
 * @param {string} method - Имя метода API 
 * @param {Object} params - Параметры запроса
 * @returns {Promise<Object>} - JSON-ответ API
 */
async function fetchLastFm(method, params = {}) {
  const apiKey = '8b2e24ae9f4cbac6552b0b570d501046';
  const url = new URL('https://ws.audioscrobbler.com/2.0/');
  url.searchParams.set('method', method);
  url.searchParams.set('api_key', apiKey);
  url.searchParams.set('format', 'json');
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network error: ' + response.status);
    const data = await response.json();
    if (data.error) throw new Error('API error: ' + data.message);
    return data;
  } catch (err) {
    showError(err.message);
    throw err;
  }
}

/**
 * Показывает сообщение об ошибке пользователю
 * @param {string} message
 */
function showError(message) {
  let errorDiv = document.getElementById('error-message');
  if (!errorDiv) {
    errorDiv = document.createElement('div');
    errorDiv.id = 'error-message';
    errorDiv.style.background = '#ffe5e5';
    errorDiv.style.color = '#a00';
    errorDiv.style.padding = '16px';
    errorDiv.style.margin = '16px 0';
    errorDiv.style.textAlign = 'center';
    errorDiv.style.fontWeight = 'bold';
    document.body.prepend(errorDiv);
  }
  errorDiv.textContent = 'Ошибка: ' + message + '. Попробуйте обновить страницу или повторить позже.';
}

/**
 * Загружает и отображает популярных исполнителей
 */
async function loadTopArtists() {
  try {
    const data = await fetchLastFm('chart.gettopartists', { limit: 12 });
    const artists = data.artists.artist;
    const list = document.querySelector('.hot-artists-list');
    if (!list) return;
    list.innerHTML = '';
    artists.forEach(artist => {
      const img = artist.image && artist.image.length
        ? artist.image[artist.image.length - 1]['#text']
        : '';
      const li = document.createElement('li');
      li.className = 'artist-card';
      li.innerHTML = `
        <img src="${img || 'placeholder.jpg'}" alt="${artist.name}" class="artist-img" />
        <div class="artist-name">${artist.name}</div>
        <div class="artist-meta">${artist.listeners} listeners</div>
      `;
      list.appendChild(li);
    });
  } catch (e) { /* Ошибка уже обработана */ }
}

/**
 * Загружает и отображает популярные треки
 */
async function loadTopTracks() {
  try {
    const data = await fetchLastFm('chart.gettoptracks', { limit: 18 });
    const tracks = data.tracks.track;
    const lists = document.querySelectorAll('.tracks-list');
    if (!lists.length) return;
    lists.forEach(list => list.innerHTML = '');
    for (let i = 0; i < 3; i++) {
      const list = lists[i];
      const slice = tracks.slice(i * 6, (i + 1) * 6);
      slice.forEach(track => {
        const img = track.image && track.image.length
          ? track.image[track.image.length - 1]['#text']
          : '';
        const li = document.createElement('li');
        li.className = 'track-card';
        li.innerHTML = `
          <img src="${img || 'placeholder.jpg'}" alt="" class="track-img" />
          <div>
            <div class="track-title">${track.name}</div>
            <div class="track-meta">${track.artist.name}</div>
          </div>
        `;
        list.appendChild(li);
      });
    }
  } catch (e) { /* Ошибка уже обработана */ }
}

/**
 * Выполняет поиск по Last.fm API
 * @param {'artist'|'album'|'track'} type
 * @param {string} query
 * @param {number} limit
 * @returns {Promise<Object[]>}
 */
async function searchLastFm(type, query, limit = 8) {
  const methods = {
    artist: 'artist.search',
    album: 'album.search',
    track: 'track.search'
  };
  const data = await fetchLastFm(methods[type], { [type]: query, limit });
  return data.results[type + 'matches'][type];
}

/**
 * Обновляет результаты поиска на странице
 * @param {string} query
 */
async function updateSearchResults(query) {
  try {
    // Artists
    const artists = await searchLastFm('artist', query, 8);
    const artistList = document.querySelector('.search-artists-list');
    if (artistList) {
      artistList.innerHTML = '';
      artists.forEach(artist => {
        const img = artist.image && artist.image.length
          ? artist.image[artist.image.length - 1]['#text']
          : '';
        const li = document.createElement('li');
        li.className = 'artist-card search-artist-card';
        li.innerHTML = `
          <img src="${img || 'placeholder.jpg'}" class="artist-img search-artist-img" alt="${artist.name}">
          <div class="artist-name">${artist.name}</div>
          <div class="artist-meta">${artist.listeners || ''} listeners</div>
        `;
        artistList.appendChild(li);
      });
    }
    // Albums
    const albums = await searchLastFm('album', query, 8);
    const albumList = document.querySelector('.search-albums-list');
    if (albumList) {
      albumList.innerHTML = '';
      albums.forEach(album => {
        const img = album.image && album.image.length
          ? album.image[album.image.length - 1]['#text']
          : '';
        const li = document.createElement('li');
        li.className = 'album-card';
        li.innerHTML = `
          <img src="${img || 'placeholder.jpg'}" class="album-img" alt="${album.name}">
          <div class="album-title">${album.name}</div>
          <div class="album-meta">${album.artist}</div>
        `;
        albumList.appendChild(li);
      });
    }
    // Tracks
    const tracks = await searchLastFm('track', query, 9);
    const trackTable = document.querySelector('.tracks-table');
    if (trackTable) {
      trackTable.innerHTML = '';
      tracks.forEach(track => {
        const img = track.image && track.image.length
          ? track.image[track.image.length - 1]['#text']
          : '';
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><img src="${img || 'placeholder.jpg'}" alt="" style="width:32px;height:32px;border-radius:4px;object-fit:cover;background:#eee;vertical-align:middle;"></td>
          <td>${track.name}</td>
          <td>${track.artist}</td>
          <td></td>
        `;
        trackTable.appendChild(tr);
      });
    }
  } catch (e) { /* Ошибка уже обработана */ }
}

// Для главной страницы
if (document.querySelector('.hot-artists-list')) loadTopArtists();
if (document.querySelector('.tracks-list')) loadTopTracks();

// Для страницы поиска
const searchForm = document.querySelector('.search-form');
if (searchForm) {
  searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const input = searchForm.querySelector('.search-input');
    if (input && input.value.trim()) {
      updateSearchResults(input.value.trim());
    }
  });
  // Автоматически подгружать результаты при первой загрузке, если есть значение
  const input = searchForm.querySelector('.search-input');
  if (input && input.value.trim()) {
    updateSearchResults(input.value.trim());
  }
}
