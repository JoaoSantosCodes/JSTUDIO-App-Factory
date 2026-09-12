export interface AdConfig {
  isTesting: boolean;
  adUnitIdAndroid?: string;
  adUnitIdIos?: string;
}

export const TEST_BANNER_ANDROID = 'ca-app-pub-3940256099942544/6300978111';

export class AdMobDriver {
  private static isInitialized = false;

  static async initialize(testing: boolean = true): Promise<void> {
    try {
      this.isInitialized = true;
      console.log(`[AdMob] Initialized (Testing: ${testing})`);
    } catch (e) {
      console.warn('[AdMob] Failed to initialize AdMob SDK', e);
    }
  }

  static getBannerAdUnitId(config: AdConfig): string {
    if (config.isTesting || !config.adUnitIdAndroid) {
      return TEST_BANNER_ANDROID;
    }
    return config.adUnitIdAndroid;
  }

  static async showBanner(config: AdConfig): Promise<void> {
    if (!this.isInitialized) {
      await this.initialize(config.isTesting);
    }
    const unitId = this.getBannerAdUnitId(config);
    console.log(`[AdMob] Displaying banner ad unit: ${unitId}`);
  }

  static async hideBanner(): Promise<void> {
    console.log('[AdMob] Hiding banner ad');
  }
}
