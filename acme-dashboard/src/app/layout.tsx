import './globals.css';
import Sidebar from '../components/Sidebar';

export const metadata = {
  title: 'Acme Dashboard',
  description: 'Next.js Partial Acme Dashboard Page',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </body>
    </html>
  );
}
