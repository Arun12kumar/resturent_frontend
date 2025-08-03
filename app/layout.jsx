import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Restaurant App',
  description: 'Discover the best dining experience',
  keywords: 'restaurant, food, dining, reservation',
  openGraph: {
    title: 'Restaurant App',
    description: 'Discover the best dining experience',
    url: 'https://yourdomain.com',
    siteName: 'Restaurant App',
    images: [
      {
        url: 'https://yourdomain.com/og-image.jpg',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <main className="min-h-[calc(100vh-140px)]">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

