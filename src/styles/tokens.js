// src/styles/tokens.js - FIXED VERSION
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
  // ====== Base ======
  surface: '#FFF9FB',
  border: '#EADCE5',
  text: '#3C2A4D',
  muted: '#9B8AA6',

  // ====== Accent ======
  accent: '#E9D8FD',
  accentAlt: '#FBC4D7',
  accentYellow: '#FDF0A3',
  accentBlue: '#A9D2FF',

  // ====== Action ======
  primary: '#C28CCB',
  primaryText: '#FFFFFF',
  success: '#A8E6A3',
  warning: '#FFD580',
  danger: '#F8A8A8',
};

// src/styles/tokens.js - ADD THIS TO EXISTING FILE
export const FONTS = {
  // Romantic & Feminine Theme
  primary: 'DancingScript-Regular',
  primaryBold: 'DancingScript-Bold',
  secondary: 'Sacramento-Regular',
};

export const SPACE = {
  xs: 4,
  s: 8,
  m: 12,
  l: 16,
  xl: 24,
  xxl: 32,
};

export const RADIUS = {
  card: 14,
  avatar: 32,
  button: 10,
};

export const TYPO = {
  h1: 26,
  title: 16,
  body: 14,
  caption: 12,
};

export const BREAKPOINTS = {
  phone: 480,
  tablet: 768,
  desktop: 1024,
};

// Simple device detection
export const isSmallPhone = width < 375;
export const isPhone = width < 768;
export const isTablet = width >= 768 && width < 1024;
export const isDesktop = width >= 1024;

// FIXED: Responsive spacing - return object directly
export const getResponsiveSpacing = () => {
  if (width < 375) {
    return {
      xs: 4,
      s: 6,
      m: 10,
      l: 14,
      xl: 20,
      xxl: 28,
    };
  } else if (width < 768) {
    return SPACE;
  } else {
    return {
      xs: 6,
      s: 10,
      m: 16,
      l: 20,
      xl: 28,
      xxl: 40,
    };
  }
};

// FIXED: Responsive typography - return object directly
export const getResponsiveTypo = () => {
  if (width < 375) {
    return {
      h1: 22,
      title: 14,
      body: 12,
      caption: 11,
    };
  } else if (width < 768) {
    return TYPO;
  } else {
    return {
      h1: 28,
      title: 18,
      body: 16,
      caption: 14,
    };
  }
};

// FIXED: Responsive dimensions - ensure all properties exist
export const getResponsiveDimensions = () => {
  if (width < 480) {
    return {
      avatarSize: 44,
      cardPadding: 12,
      heroHeight: height * 0.25,
      layoutMode: 'list',
      columns: 1,
    };
  } else if (width < 1024) {
    return {
      avatarSize: 52,
      cardPadding: 16,
      heroHeight: height * 0.3,
      layoutMode: 'grid',
      columns: 2,
    };
  } else {
    return {
      avatarSize: 56,
      cardPadding: 20,
      heroHeight: height * 0.35,
      layoutMode: 'list',
      columns: 1,
    };
  }
};