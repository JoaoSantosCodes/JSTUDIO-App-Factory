import { LocalNotifications } from '@capacitor/local-notifications';

export class NotificationDriver {
  static async requestPermissions(): Promise<boolean> {
    try {
      const perm = await LocalNotifications.requestPermissions();
      return perm.display === 'granted';
    } catch {
      console.log('[Notifications] Permission request skipped (Web fallback)');
      return false;
    }
  }

  static async scheduleDailyReminder(hour: number = 20, minute: number = 0): Promise<boolean> {
    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) return false;

      // Cancel existing reminders first
      await LocalNotifications.cancel({ notifications: [{ id: 1001 }] });

      await LocalNotifications.schedule({
        notifications: [
          {
            title: 'Quanto Posso Gastar?',
            body: 'Já registrou seus gastos de hoje? Mantenha seu orçamento atualizado!',
            id: 1001,
            schedule: {
              on: {
                hour,
                minute,
              },
              repeats: true,
            },
          },
        ],
      });
      console.log(`[Notifications] Daily reminder scheduled for ${hour}:${minute}`);
      return true;
    } catch (e) {
      console.warn('[Notifications] Scheduling failed:', e);
      return false;
    }
  }

  static async cancelDailyReminder(): Promise<void> {
    try {
      await LocalNotifications.cancel({ notifications: [{ id: 1001 }] });
      console.log('[Notifications] Daily reminder cancelled');
    } catch (e) {
      console.warn('[Notifications] Cancel failed:', e);
    }
  }
}
