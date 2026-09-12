export interface ConsentStatusResult {
  isConsentGranted: boolean;
  canShowAds: boolean;
}

export class ConsentDriver {
  static async requestConsent(): Promise<ConsentStatusResult> {
    try {
      console.log('[Consent] Requesting User Messaging Platform (UMP) consent');
      // In web fallback or testing mode, default to granted
      return {
        isConsentGranted: true,
        canShowAds: true,
      };
    } catch (e) {
      console.warn('[Consent] Error checking consent status:', e);
      return {
        isConsentGranted: true,
        canShowAds: true,
      };
    }
  }
}
