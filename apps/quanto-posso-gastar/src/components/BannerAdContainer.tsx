import React, { useEffect } from 'react';
import { AdMobDriver, TEST_BANNER_ANDROID } from '@jstudio/ads';

export const BannerAdContainer: React.FC = () => {
  useEffect(() => {
    AdMobDriver.showBanner({
      isTesting: true,
      adUnitIdAndroid: TEST_BANNER_ANDROID,
    });
  }, []);

  return (
    <div className="fixed bottom-14 left-0 right-0 z-30 flex items-center justify-center bg-slate-900/95 border-t border-b border-slate-800 py-1.5 px-4 text-center">
      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
        [ AdMob Banner Space — Test Unit ID Active ]
      </span>
    </div>
  );
};
