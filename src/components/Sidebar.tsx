'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { href: '/', label: 'หน้าแรก', icon: '🏠' },
    { href: '/dashboard', label: 'แดชบอร์ด', icon: '📊' },
    { href: '/news-editor', label: 'เขียนข่าว', icon: '📰' },
    { href: '/popups', label: 'ตัวอย่าง Popup', icon: '🔔' },
    { href: '/table-examples', label: 'ตัวอย่างตาราง', icon: '📝' },
    { href: '/services', label: 'บริการ', icon: '⚙️' },
    { href: '/contact', label: 'ติดต่อ', icon: '📧' },
    { href: '/chat', label: 'ข้อความ', icon: '🔔' },
  ];

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-700 text-white md:hidden hover:bg-gray-700 transition-colors"
        aria-label="Toggle sidebar"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-gray-900 text-white transition-transform duration-300 ease-in-out z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          w-64 md:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="p-5 border-b border-gray-700">
          <h2 className="text-2xl font-bold pl-6 md:pl-0">เมนู</h2>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <p className="text-sm text-gray-400 text-center">
            © 2025 My Next.js App
          </p>
        </div>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-opacity-50 z-30 md:hidden"
        />
      )}
    </>
  );
}
