'use client';

import { useState } from 'react';

export default function TableExamples() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // ข้อมูลตัวอย่าง
  const sampleUsers = [
    { id: 1, name: 'สมชาย ใจดี', email: 'somchai@example.com', role: 'Admin', status: 'active', department: 'IT', joinDate: '2023-01-15' },
    { id: 2, name: 'สมหญิง รักเมือง', email: 'somying@example.com', role: 'User', status: 'active', department: 'Marketing', joinDate: '2023-02-20' },
    { id: 3, name: 'สมศักดิ์ รักเรียน', email: 'somsak@example.com', role: 'Editor', status: 'inactive', department: 'Content', joinDate: '2023-03-10' },
    { id: 4, name: 'สมพร ทำดี', email: 'somporn@example.com', role: 'User', status: 'active', department: 'Sales', joinDate: '2023-04-05' },
    { id: 5, name: 'สมใจ มั่นคง', email: 'somjai@example.com', role: 'Admin', status: 'pending', department: 'HR', joinDate: '2023-05-12' },
    { id: 6, name: 'นภา สวยงาม', email: 'napa@example.com', role: 'User', status: 'active', department: 'Design', joinDate: '2023-06-18' },
    { id: 7, name: 'วิชัย เก่งมาก', email: 'wichai@example.com', role: 'Editor', status: 'inactive', department: 'Content', joinDate: '2023-07-22' },
    { id: 8, name: 'ประทีป สว่างไสว', email: 'prateep@example.com', role: 'User', status: 'active', department: 'IT', joinDate: '2023-08-30' },
  ];

  // คำนวณข้อมูลสำหรับ Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sampleUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sampleUsers.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-8 max-w-full bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">ตัวอย่าง Table Designs</h1>
        <p className="text-gray-600">รวมตัวอย่าง Table 5 รูปแบบที่สวยงามด้วย Tailwind CSS</p>
      </div>

      {/* Table 1: Simple Table */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Simple Table (ตารางธรรมดา)</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ชื่อ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">อีเมล</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">แผนก</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sampleUsers.slice(0, 5).map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.department}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Table 2: Striped Table */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Striped Table (ตารางแถบสลับสี)</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">ชื่อผู้ใช้</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">อีเมล</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">บทบาท</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">วันที่เข้าร่วม</th>
              </tr>
            </thead>
            <tbody>
              {sampleUsers.slice(0, 6).map((user, index) => (
                <tr key={user.id} className={index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                  <td className="px-6 py-4 text-sm text-gray-900">{user.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.role}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.joinDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Table 3: Table with Actions */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Table with Actions (ตารางพร้อมปุ่มจัดการ)</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">ชื่อ</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">อีเมล</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">แผนก</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sampleUsers.slice(0, 5).map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900">{user.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.department}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors">
                        ดู
                      </button>
                      <button className="px-3 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600 transition-colors">
                        แก้ไข
                      </button>
                      <button className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors">
                        ลบ
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Table 4: Table with Status Badges */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Table with Status Badges (ตารางพร้อมป้ายสถานะ)</h2>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">ชื่อผู้ใช้</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">อีเมล</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">บทบาท</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">สถานะ</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">แผนก</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sampleUsers.map((user) => (
                <tr key={user.id} className="hover:bg-purple-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900">{user.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0)}
                      </div>
                      {user.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                      user.role === 'Admin' ? 'bg-red-100 text-red-800' :
                      user.role === 'Editor' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' :
                      user.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        user.status === 'active' ? 'bg-green-500' :
                        user.status === 'inactive' ? 'bg-gray-500' :
                        'bg-yellow-500'
                      }`}></span>
                      {user.status === 'active' ? 'ใช้งาน' : user.status === 'inactive' ? 'ไม่ใช้งาน' : 'รอดำเนินการ'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.department}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Table 5: Table with Pagination */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Table with Pagination (ตารางพร้อมการแบ่งหน้า)</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">ชื่อผู้ใช้</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">อีเมล</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">บทบาท</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">สถานะ</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">วันที่เข้าร่วม</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentItems.map((user) => (
                  <tr key={user.id} className="hover:bg-green-50 transition-colors">
                    <td className="px-6 py-4">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.role}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${
                        user.status === 'active' ? 'bg-green-100 text-green-800' :
                        user.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.joinDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                แสดง <span className="font-semibold">{indexOfFirstItem + 1}</span> ถึง{' '}
                <span className="font-semibold">{Math.min(indexOfLastItem, sampleUsers.length)}</span> จาก{' '}
                <span className="font-semibold">{sampleUsers.length}</span> รายการ
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    currentPage === 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  ก่อนหน้า
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      currentPage === index + 1
                        ? 'bg-green-500 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    currentPage === totalPages
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  ถัดไป
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">สรุปตัวอย่างทั้งหมด</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="text-3xl font-bold mb-2">5</div>
            <div className="text-sm">รูปแบบตาราง</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="text-3xl font-bold mb-2">8</div>
            <div className="text-sm">ข้อมูลตัวอย่าง</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="text-3xl font-bold mb-2">100%</div>
            <div className="text-sm">Tailwind CSS</div>
          </div>
        </div>
      </div>
    </div>
  );
}
