import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.845b5709a90148ecb22c477b92270d59',
  appName: 'cobra-snake-blast',
  webDir: 'dist',
  server: {
    url: 'https://845b5709-a901-48ec-b22c-477b92270d59.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#0a0a0f',
      showSpinner: false
    }
  }
};

export default config;