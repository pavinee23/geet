import type { Metadata } from 'next';
import './ge-energy-tech.css';

const SITE_URL = 'https://www.ge-energytech.com';
const LOGO_PATH = '/ge-energyTech/138568-transparent.png';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'GE Energy Tech Co., Ltd.',
  description: 'Smart Energy Technology Startup',
  icons: {
    icon: [{ url: LOGO_PATH, type: 'image/png' }],
    apple: [{ url: LOGO_PATH, type: 'image/png' }],
    shortcut: [LOGO_PATH],
  },
  openGraph: {
    title: 'GE Energy Tech Co., Ltd.',
    description: 'Smart Energy · IoT · Green Innovation',
    url: SITE_URL,
    siteName: 'GE Energy Tech',
    images: [{ url: LOGO_PATH, width: 512, height: 512, alt: 'GE Energy Tech logo' }],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'GE Energy Tech Co., Ltd.',
    description: 'Smart Energy · IoT · Green Innovation',
    images: [LOGO_PATH],
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
