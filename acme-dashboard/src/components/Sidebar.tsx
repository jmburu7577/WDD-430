'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FileText, Users } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/', icon: <Home className="h-5 w-5" /> },
  { name: 'Invoices', href: '/invoices', icon: <FileText className="h-5 w-5" /> },
  { name: 'Customers', href: '/customers', icon: <Users className="h-5 w-5" /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen p-4 bg-white border-r">
      <div className="mb-8">
        <div className="bg-blue-600 text-white text-2xl font-semibold p-6 rounded-lg flex items-center justify-center">
          🌐 Acme
        </div>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-2 rounded-md text-sm font-medium
                ${isActive ? 'bg-blue-100 text-blue-900' : 'hover:bg-gray-100'}
              `}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
