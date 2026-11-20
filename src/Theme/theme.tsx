// Theme/theme.ts
'use client';

import { createTheme, alpha, Theme, PaletteMode } from '@mui/material/styles';

/**
 * Font: load "Inter" in your root layout, e.g. with next/font:
 *   import { Inter } from 'next/font/google';
 *   const inter = Inter({ subsets: ['latin'], display: 'swap' });
 * and apply inter.style.fontFamily (or a CSS variable) to <body>.
 * The fallback stack below is used until it loads.
 */
const fontFamily =
  '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif';

// Colors for charts (works on both light and dark surfaces)
export const chartColors = [
  '#3B5BDB', // cobalt
  '#12B886', // green
  '#F59F00', // amber
  '#E64980', // pink
  '#7048E8', // violet
  '#15AABF', // cyan
];

const getTheme = (mode: PaletteMode): Theme => {
  const isLight = mode === 'light';

  // Surfaces and lines
  const border = isLight ? '#E7E3DC' : '#2A3140';
  const hoverBg = isLight ? alpha('#2B2620', 0.045) : alpha('#FFFFFF', 0.06);

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isLight ? '#3B5BDB' : '#8CA2FF',
        light: isLight ? '#6C85F0' : '#B4C2FF',
        dark: isLight ? '#2B44A8' : '#5F7BEA',
        contrastText: isLight ? '#FFFFFF' : '#0B1020',
      },
      secondary: {
        main: isLight ? '#7048E8' : '#B197FC',
      },
      success: { main: isLight ? '#0E9F6E' : '#3DD9A4' },
      warning: { main: isLight ? '#D9822B' : '#FFB454' },
      error: { main: isLight ? '#D92D20' : '#FF7A70' },
      info: { main: isLight ? '#0E8FB0' : '#4CC9E8' },
      background: {
        default: isLight ? '#F2EFEA' : '#0E121A', // soft pearl canvas
        paper: isLight ? '#FCFAF6' : '#161B26', // porcelain surface (replaces pure white)
      },
      text: {
        primary: isLight ? '#1D1B19' : '#E8ECF4',
        secondary: isLight ? '#6B665E' : '#9AA4B8',
      },
      divider: border,
      action: {
        hover: hoverBg,
        selected: alpha(isLight ? '#3B5BDB' : '#8CA2FF', isLight ? 0.1 : 0.16),
      },
    },

    shape: { borderRadius: 10 },

    typography: {
      fontFamily,
      h1: { fontSize: '2.25rem', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.2 },
      h2: { fontSize: '1.875rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.25 },
      h3: { fontSize: '1.5rem', fontWeight: 650, letterSpacing: '-0.015em', lineHeight: 1.3 },
      h4: { fontSize: '1.25rem', fontWeight: 650, letterSpacing: '-0.01em' },
      h5: { fontSize: '1.0625rem', fontWeight: 600 },
      h6: { fontSize: '0.9375rem', fontWeight: 600 },
      subtitle1: { fontSize: '0.9375rem', fontWeight: 500 },
      subtitle2: { fontSize: '0.8125rem', fontWeight: 600 },
      body1: { fontSize: '0.9375rem', lineHeight: 1.55 },
      body2: { fontSize: '0.8125rem', lineHeight: 1.5 },
      caption: { fontSize: '0.75rem', lineHeight: 1.4 },
      overline: { fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.06em' },
      button: { textTransform: 'none', fontWeight: 600, letterSpacing: 0 },
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            fontFeatureSettings: '"cv11", "ss01"',
            WebkitFontSmoothing: 'antialiased',
          },
          // Align digits in tables and stat figures
          'table, .tabular-nums': { fontVariantNumeric: 'tabular-nums' },
          '*::-webkit-scrollbar': { width: 8, height: 8 },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: isLight ? '#D3CDC3' : '#3A4358',
            borderRadius: 8,
          },
          '*::-webkit-scrollbar-track': { backgroundColor: 'transparent' },
        },
      },

      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: { borderRadius: 8, padding: '6px 14px' },
          sizeLarge: { padding: '9px 20px' },
          containedPrimary: {
            '&:hover': { backgroundColor: isLight ? '#2B44A8' : '#B4C2FF' },
          },
          outlined: { borderColor: border },
        },
      },

      MuiIconButton: {
        styleOverrides: { root: { borderRadius: 8 } },
      },

      // Cards and panels: flat with a hairline border instead of heavy shadows
      MuiPaper: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: { backgroundImage: 'none' },
          outlined: { borderColor: border },
        },
      },
      MuiCard: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: {
            border: `1px solid ${border}`,
            borderRadius: 14,
            boxShadow: isLight ? '0 1px 2px rgba(43, 38, 32, 0.05)' : 'none',
          },
        },
      },
      MuiCardHeader: {
        styleOverrides: {
          root: { padding: '16px 20px 8px' },
          title: { fontSize: '0.9375rem', fontWeight: 600 },
          subheader: { fontSize: '0.8125rem' },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: { padding: 20, '&:last-child': { paddingBottom: 20 } },
        },
      },

      MuiAppBar: {
        defaultProps: { elevation: 0, color: 'inherit' },
        styleOverrides: {
          root: {
            backgroundColor: alpha(isLight ? '#FCFAF6' : '#161B26', 0.85),
            backdropFilter: 'blur(10px)',
            borderBottom: `1px solid ${border}`,
            color: isLight ? '#1D1B19' : '#E8ECF4',
          },
        },
      },

      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: isLight ? '#F9F6F1' : '#12161F',
            borderRight: `1px solid ${border}`,
          },
        },
      },

      // Sidebar navigation items
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            margin: '2px 8px',
            padding: '8px 12px',
            '&.Mui-selected': {
              backgroundColor: alpha(isLight ? '#3B5BDB' : '#8CA2FF', isLight ? 0.1 : 0.16),
              color: isLight ? '#2B44A8' : '#B4C2FF',
              fontWeight: 600,
              '& .MuiListItemIcon-root': { color: 'inherit' },
              '&:hover': {
                backgroundColor: alpha(isLight ? '#3B5BDB' : '#8CA2FF', isLight ? 0.14 : 0.22),
              },
            },
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: { root: { minWidth: 36, color: isLight ? '#6B665E' : '#9AA4B8' } },
      },

      // Tables
      MuiTableCell: {
        styleOverrides: {
          root: { borderBottom: `1px solid ${border}`, padding: '12px 16px' },
          head: {
            fontWeight: 600,
            fontSize: '0.75rem',
            color: isLight ? '#6B665E' : '#9AA4B8',
            backgroundColor: isLight ? '#F6F3EE' : '#12161F',
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            '&:last-child td': { borderBottom: 0 },
            '&.MuiTableRow-hover:hover': { backgroundColor: hoverBg },
          },
        },
      },

      // Status pills
      MuiChip: {
        styleOverrides: {
          root: { fontWeight: 600, fontSize: '0.75rem', borderRadius: 6 },
          sizeSmall: { height: 22 },
        },
      },

      MuiTextField: { defaultProps: { size: 'small' } },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            backgroundColor: isLight ? '#FEFDFB' : alpha('#FFFFFF', 0.03),
            '& .MuiOutlinedInput-notchedOutline': { borderColor: border },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: isLight ? '#C9C3B8' : '#4A5570',
            },
          },
        },
      },

      MuiTabs: {
        styleOverrides: {
          root: { minHeight: 40, borderBottom: `1px solid ${border}` },
          indicator: { height: 2, borderRadius: 2 },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: { minHeight: 40, fontWeight: 600, fontSize: '0.875rem', padding: '8px 16px' },
        },
      },

      MuiTooltip: {
        defaultProps: { arrow: true },
        styleOverrides: {
          tooltip: {
            backgroundColor: isLight ? '#101828' : '#2A3140',
            fontSize: '0.75rem',
            borderRadius: 6,
            padding: '6px 10px',
          },
          arrow: { color: isLight ? '#101828' : '#2A3140' },
        },
      },

      MuiDialog: {
        styleOverrides: { paper: { borderRadius: 16, border: `1px solid ${border}` } },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            border: `1px solid ${border}`,
            boxShadow: '0 8px 24px rgba(16, 24, 40, 0.12)',
          },
        },
      },
      MuiDivider: { styleOverrides: { root: { borderColor: border } } },
      MuiLinearProgress: {
        styleOverrides: { root: { borderRadius: 4, height: 6 } },
      },
    },
  });
};

export const lightTheme: Theme = getTheme('light');
export const darkTheme: Theme = getTheme('dark');

export default lightTheme;
export type { Theme };