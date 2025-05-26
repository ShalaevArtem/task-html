const API_KEY = "8b2e24ae9f4cbac6552b0b570d501046";

/**
 * Выполняет GET-запрос к Last.fm API с заданным методом и параметрами.
 *
 * @template T Тип возвращаемых данных (определяется при вызове функции)
 * @param {string} method - Метод Last.fm API 
 * @param {Record<string, string | number>} params - Объект с параметрами запроса
 * @returns {Promise<T>} Промис с результатом запроса в формате JSON
 * @throws {Error} Если произошла ошибка сети или сервер вернул неуспешный статус
 */
export async function fetchLastFm<T>(
  method: string,
  params: Record<string, string | number>
): Promise<T> {
  const url = new URL("https://ws.audioscrobbler.com/2.0/");
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("format", "json");
  url.searchParams.set("method", method);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.set(key, value.toString())
  );
  const response = await fetch(url.toString());
  if (!response.ok) throw new Error("Network error");
  return response.json();
}
