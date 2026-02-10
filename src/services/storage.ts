// Storage service - uses localStorage (swap for Capacitor Preferences for native)
const PREFIX = 'vcl_';

export const storage = {
  async set(key: string, value: unknown): Promise<void> {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage set error:', e);
    }
  },

  async get<T>(key: string): Promise<T | null> {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      return raw ? JSON.parse(raw) as T : null;
    } catch (e) {
      console.error('Storage get error:', e);
      return null;
    }
  },

  async remove(key: string): Promise<void> {
    localStorage.removeItem(PREFIX + key);
  },

  async clear(): Promise<void> {
    const keys = Object.keys(localStorage).filter(k => k.startsWith(PREFIX));
    keys.forEach(k => localStorage.removeItem(k));
  },
};
