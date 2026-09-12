export type AnalyticsEventName =
  | 'app_open'
  | 'onboarding_completed'
  | 'budget_created'
  | 'expense_added'
  | 'expense_deleted'
  | 'history_opened'
  | 'settings_opened'
  | 'notification_enabled'
  | 'ad_impression';

export class AnalyticsDriver {
  static async init(): Promise<void> {
    try {
      console.log('[Analytics] Initialized (Privacy Safeguard Active: No financial amounts logged)');
    } catch (e) {
      console.warn('[Analytics] Init skipped:', e);
    }
  }

  static async logEvent(eventName: AnalyticsEventName, params?: Record<string, string | number>): Promise<void> {
    // Strict privacy safeguard: filter any keys that could contain financial values
    const safeParams = params ? { ...params } : {};
    delete safeParams['amount'];
    delete safeParams['income'];
    delete safeParams['fixedExpenses'];
    delete safeParams['savingsGoal'];

    try {
      console.log(`[Analytics Event] ${eventName}`, safeParams);
    } catch (e) {
      console.warn(`[Analytics Event Error] ${eventName}`, e);
    }
  }
}
