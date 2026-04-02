import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yourcompany.fifanycguide',      // ← change to your Apple bundle ID
  appName: 'FIFA NYC Guide',
  webDir: 'out',                               // Next.js static export output
  server: {
    androidScheme: 'https'
  },
  ios: {
    contentInset: 'always',                    // handles iPhone notch / Dynamic Island
    backgroundColor: '#0A0A0A',
    preferredContentMode: 'mobile',
    scheme: 'FIFANYCGuide'
  },
  android: {
    backgroundColor: '#0A0A0A'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#0A0A0A',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0A0A0A'
    }
  }
};

export default config;
