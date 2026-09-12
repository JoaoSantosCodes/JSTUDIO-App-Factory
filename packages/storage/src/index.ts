import { Preferences } from '@capacitor/preferences';

export class LocalStorageDriver {
  static async setItem<T>(key: string, value: T): Promise<void> {
    const stringified = JSON.stringify(value);
    try {
      await Preferences.set({ key, value: stringified });
    } catch {
      // Fallback for non-Capacitor web environments
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, stringified);
      }
    }
  }

  static async getItem<T>(key: string, defaultValue: T): Promise<T> {
    try {
      const { value } = await Preferences.get({ key });
      if (value !== null && value !== undefined) {
        return JSON.parse(value) as T;
      }
    } catch {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = window.localStorage.getItem(key);
        if (stored !== null) {
          return JSON.parse(stored) as T;
        }
      }
    }
    return defaultValue;
  }

  static async removeItem(key: string): Promise<void> {
    try {
      await Preferences.remove({ key });
    } catch {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    }
  }

  static async clearAll(): Promise<void> {
    try {
      await Preferences.clear();
    } catch {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.clear();
      }
    }
  }
}
