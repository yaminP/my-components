'use client';

import { useState } from 'react';
import Link from 'next/link';

// ประเภทข้อมูลข่าว
interface NewsItem {
  id: number;
  title: string;
  author: string;
  publishDate: string;
  coverImage?: string;
  content: string;
  sourceLink?: string;
  tags: string[];
  status: 'draft' | 'published';
}

export default function NewsManagement() {
  // ข้อมูลตัวอย่างข่าว
  const [newsList, setNewsList] = useState<NewsItem[]>([
    {
      id: 1,
      title: 'เทคโนโลยี AI พัฒนาก้าวกระโดดในปี 2024',
      author: 'สมชาย ใจดี',
      publishDate: '2024-01-15',
      content: 'เนื้อหาข่าวเกี่ยวกับ AI...',
      tags: ['เทคโนโลยี', 'AI'],
      status: 'published'
    },
    {
      id: 2,
      title: 'การท่องเที่ยวไทยฟื้นตัวแข็งแกร่ง',
      author: 'สมหญิง รักเมือง',
      publishDate: '2024-01-14',
      content: 'เนื้อหาข่าวเกี่ยวกับการท่องเที่ยว...',
      tags: ['ท่องเที่ยว', 'เศรษฐกิจ'],
      status: 'published'
    },
    {
      id: 3,
      title: 'นวัตกรรมการศึกษาออนไลน์ยุคใหม่',
      author: 'สมศักดิ์ รักเรียน',
      publishDate: '2024-01-13',
      content: 'เนื้อหาข่าวเกี่ยวกับการศึกษา...',
      tags: ['การศึกษา', 'เทคโนโลยี'],
      status: 'draft'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'published'>('all');

  // ฟังก์ชันลบข่าว
  const handleDelete = (id: number) => {
    if (confirm('คุณต้องการลบข่าวนี้ใช่หรือไม่?')) {
      setNewsList(newsList.filter(news => news.id !== id));
    }
  };

  // กรองข่าวตามการค้นหาและสถานะ
  const filteredNews = newsList.filter(news => {
    const matchSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       news.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || news.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-8 max-w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">จัดการข่าวสาร</h1>
        <p className="text-gray-600">จัดการและแก้ไขข่าวสารทั้งหมด</p>
      </div>

      {/* ส่วนค้นหาและกรอง */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* ช่องค้นหา */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ค้นหาข่าว
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ค้นหาจากชื่อข่าวหรือชื่อผู้เขียน..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* กรองตามสถานะ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              สถานะ
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'draft' | 'published')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">ทั้งหมด</option>
              <option value="published">เผยแพร่แล้ว</option>
              <option value="draft">แบบร่าง</option>
            </select>
          </div>
        </div>

        {/* ปุ่มเพิ่มข่าวใหม่ */}
        <div className="mt-4">
          <Link href="/news-editor/create">
            <button className="w-full md:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              เพิ่มข่าวใหม่
            </button>
          </Link>
        </div>
      </div>

      {/* ตารางข่าว */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ชื่อข่าว</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ผู้เขียน</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">วันที่ลงข่าว</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">แท็ก</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">สถานะ</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredNews.length > 0 ? (
                filteredNews.map((news) => (
                  <tr key={news.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900">{news.id}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{news.title}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{news.author}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {new Date(news.publishDate).toLocaleDateString('th-TH', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {news.tags.slice(0, 2).map((tag, idx) => (
                          <span
                            key={idx}
                            className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                        {news.tags.length > 2 && (
                          <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                            +{news.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                          news.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {news.status === 'published' ? 'เผยแพร่แล้ว' : 'แบบร่าง'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {/* ปุ่มแก้ไข */}
                        <Link href={`/news-editor/edit/${news.id}`}>
                          <button
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="แก้ไข"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                        </Link>

                        {/* ปุ่มลบ */}
                        <button
                          onClick={() => handleDelete(news.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="ลบ"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-gray-500 text-lg">ไม่พบข่าวสาร</p>
                      <p className="text-gray-400 text-sm mt-2">ลองค้นหาด้วยคำอื่นหรือเพิ่มข่าวใหม่</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* สถิติ */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              แสดง <span className="font-semibold text-gray-900">{filteredNews.length}</span> จาก <span className="font-semibold text-gray-900">{newsList.length}</span> ข่าว
            </div>
            <div className="flex gap-4">
              <div>
                เผยแพร่แล้ว: <span className="font-semibold text-green-600">{newsList.filter(n => n.status === 'published').length}</span>
              </div>
              <div>
                แบบร่าง: <span className="font-semibold text-yellow-600">{newsList.filter(n => n.status === 'draft').length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
