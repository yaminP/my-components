'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSidebar } from '@/contexts/SidebarContext';

interface MenuItem {
  href?: string;
  label: string;
  icon: string;
  submenu?: MenuItem[];
}

export default function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebar();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const menuItems: MenuItem[] = [
    { href: '/', label: 'หน้าแรก', icon: '🏠' },
    { href: '/dashboard', label: 'แดชบอร์ด', icon: '📊' },
    { href: '/news-editor', label: 'เขียนข่าว', icon: '📰' },
    { href: '/popups', label: 'ตัวอย่าง Popup', icon: '🔔' },
    { href: '/table-examples', label: 'ตัวอย่างตาราง', icon: '📝' },
    { href: '/card-examples', label: 'ตัวอย่าง Card', icon: '📧' },
    { href: '/chat', label: 'ข้อความ', icon: '💬' },
    {
      label: 'ตั้งค่าเพจ',
      icon: '⚙️',
      submenu: [
        { href: '/settings/page1', label: 'Page 1', icon: '📄' },
        { href: '/settings/page2', label: 'Page 2', icon: '📄' },
      ],
    },
  ];

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const renderMenuItem = (item: MenuItem) => {
    // ถ้ามี submenu ให้ render เป็น dropdown
    if (item.submenu) {
      const isSubmenuOpen = openMenus[item.label] || false;

      return (
        <li key={item.label}>
          <button
            onClick={() => toggleMenu(item.label)}
            className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              <span className="font-medium">{item.label}</span>
            </div>
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${
                isSubmenuOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Submenu */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isSubmenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <ul className="mt-2 ml-4 space-y-1 border-l-2 border-gray-700 pl-2">
              {item.submenu.map((subItem) => (
                <li key={subItem.href}>
                  <Link
                    href={subItem.href!}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors group text-sm"
                  >
                    <span className="text-lg">{subItem.icon}</span>
                    <span>{subItem.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </li>
      );
    }

    // ถ้าไม่มี submenu ให้ render เป็น link ธรรมดา
    return (
      <li key={item.href}>
        <Link
          href={item.href!}
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors group"
        >
          <span className="text-2xl group-hover:scale-110 transition-transform">
            {item.icon}
          </span>
          <span className="font-medium">{item.label}</span>
        </Link>
      </li>
    );
  };

  return (
    <>
      {/* Toggle Button - ทำงานทุกขนาดจอ */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors shadow-lg"
        aria-label="Toggle sidebar"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar - เปิด/ปิดได้ทุกขนาดจอ */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-gray-900 text-white transition-transform duration-300 ease-in-out z-40 w-64
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Sidebar Header */}
        <div className="p-5 ml-3 border-b border-gray-700">
          <h2 className="text-2xl font-bold pl-6">เมนู</h2>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 140px)' }}>
          <ul className="space-y-2">
            {menuItems.map((item) => renderMenuItem(item))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <p className="text-sm text-gray-400 text-center">
            © 2025 My Next.js App
          </p>
        </div>
      </aside>

      {/* Overlay - แสดงเมื่อ sidebar เปิดบนทุกขนาดจอ */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/15 bg-opacity-50 z-30"
        />
      )}
    </>
  );
}
