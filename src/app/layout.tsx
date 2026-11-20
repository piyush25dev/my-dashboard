// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider as AppThemeProvider } from '@/context/ThemeContext';
import ThemeProvider from '@/Providers/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Dashboard App',
  description: 'A responsive dashboard with authentication',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <AppRouterCacheProvider>
          <AppThemeProvider>
            <ThemeProvider>
              <AuthProvider>{children}</AuthProvider>
            </ThemeProvider>
          </AppThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}