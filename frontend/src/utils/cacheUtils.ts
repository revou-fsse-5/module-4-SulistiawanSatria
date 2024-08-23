const CACHE_DURATION = 5 * 60 * 1000; // 5 menit

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

export function setCache<T>(key: string, data: T): void {
  const item: CacheItem<T> = { data, timestamp: Date.now() };
  localStorage.setItem(key, JSON.stringify(item));
}

export function getCache<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  if (!item) return null;

  const parsedItem: CacheItem<T> = JSON.parse(item);
  if (Date.now() - parsedItem.timestamp > CACHE_DURATION) {
    localStorage.removeItem(key);
    return null;
  }

  return parsedItem.data;
}
