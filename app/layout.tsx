import type { Metadata } from 'next';
import './ge-energy-tech.css';

export const metadata: Metadata = {
  title: 'GE Energy Tech Co., Ltd.',
  description: 'Smart Energy Technology Startup',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
