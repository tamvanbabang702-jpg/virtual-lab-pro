// Storage service - uses Capacitor Preferences on native, localStorage on web
import { Preferences } from '@capacitor/preferences';

const PREFIX = 'vcl_';

const isNative = (): boolean => {
  try {
    return typeof (window as any)?.Capacitor?.isNativePlatform === 'function'
      ? (window as any).Capacitor.isNativePlatform()
      : false;
  } catch {
    return false;
  }
};

export const storage = {
  async set(key: string, value: unknown): Promise<void> {
    try {
      const json = JSON.stringify(value);
      if (isNative()) {
        await Preferences.set({ key: PREFIX + key, value: json });
      } else {
        localStorage.setItem(PREFIX + key, json);
      }
    } catch (e) {
      console.error('Storage set error:', e);
    }
  },

  async get<T>(key: string): Promise<T | null> {
    try {
      if (isNative()) {
        const { value } = await Preferences.get({ key: PREFIX + key });
        return value ? (JSON.parse(value) as T) : null;
      } else {
        const raw = localStorage.getItem(PREFIX + key);
        return raw ? (JSON.parse(raw) as T) : null;
      }
    } catch (e) {
      console.error('Storage get error:', e);
      return null;
    }
  },

  async remove(key: string): Promise<void> {
    if (isNative()) {
      await Preferences.remove({ key: PREFIX + key });
    } else {
      localStorage.removeItem(PREFIX + key);
    }
  },

  async clear(): Promise<void> {
    if (isNative()) {
      await Preferences.clear();
    } else {
      const keys = Object.keys(localStorage).filter(k => k.startsWith(PREFIX));
      keys.forEach(k => localStorage.removeItem(k));
    }
  },
};
