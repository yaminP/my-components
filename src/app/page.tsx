export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to My Next.js App</h1>
      <p className="text-lg text-gray-600 mb-4">
        นี่คือแอปพลิเคชัน Next.js พร้อม Sidebar ที่ทันสมัย
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">ฟีเจอร์ 1</h2>
          <p className="text-gray-600">Responsive sidebar ที่ทำงานได้ดีทั้งบนมือถือและเดสก์ท็อป</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">ฟีเจอร์ 2</h2>
          <p className="text-gray-600">การออกแบบที่สวยงามด้วย Tailwind CSS</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">ฟีเจอร์ 3</h2>
          <p className="text-gray-600">เมนูที่ใช้งานง่ายและเข้าถึงได้ดี</p>
        </div>
      </div>
    </div>
  );
}
