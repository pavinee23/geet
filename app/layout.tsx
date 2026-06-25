import type { Metadata } from 'next';
import './ge-energy-tech.css';

export const metadata: Metadata = {
  title: 'GE Energy Tech Co., Ltd.',
  description: 'Smart Energy Technology Startup',
  icons: {
    icon: '/ge-energyTech/138568-transparent.png',
    apple: '/ge-energyTech/138568-transparent.png',
  },
  openGraph: {
    title: 'GE Energy Tech Co., Ltd.',
    description: 'Smart Energy · IoT · Green Innovation',
    url: 'https://ge-energytech.com',
    siteName: 'GE Energy Tech',
    images: [{ url: '/ge-energyTech/138568-transparent.png', width: 512, height: 512, alt: 'GE Energy Tech logo' }],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'GE Energy Tech Co., Ltd.',
    description: 'Smart Energy · IoT · Green Innovation',
    images: ['/ge-energyTech/138568-transparent.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>{children}</body>
    </html>
  );
}
