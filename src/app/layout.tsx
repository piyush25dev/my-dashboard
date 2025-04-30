import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/context/AuthContext';
import ThemeProvider from '@/Providers/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}