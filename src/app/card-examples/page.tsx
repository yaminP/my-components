'use client';

import { useState } from 'react';

export default function CardExamples() {
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLikedProducts(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-8 max-w-full bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">ตัวอย่าง Card Designs</h1>
        <p className="text-gray-600">รวมตัวอย่าง Card 5 รูปแบบที่สวยงามด้วย Tailwind CSS</p>
      </div>

      {/* Card 1: Product Card */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">1. Product Card (การ์ดสินค้า)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { id: 1, name: 'MacBook Pro M3', price: '฿89,900', image: '💻', category: 'Laptop', rating: 4.8, reviews: 256 },
            { id: 2, name: 'iPhone 15 Pro', price: '฿42,900', image: '📱', category: 'Smartphone', rating: 4.9, reviews: 512 },
            { id: 3, name: 'AirPods Pro', price: '฿8,990', image: '🎧', category: 'Audio', rating: 4.7, reviews: 189 },
            { id: 4, name: 'Apple Watch Ultra', price: '฿31,900', image: '⌚', category: 'Wearable', rating: 4.6, reviews: 142 }
          ].map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              {/* Image */}
              <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 h-48 flex items-center justify-center">
                <span className="text-7xl">{product.image}</span>
                <button
                  onClick={() => toggleLike(product.id)}
                  className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                >
                  <span className={likedProducts.includes(product.id) ? 'text-red-500' : 'text-gray-400'}>
                    {likedProducts.includes(product.id) ? '❤️' : '🤍'}
                  </span>
                </button>
                <span className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                  NEW
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <span className="text-xs text-blue-600 font-semibold uppercase tracking-wider">
                  {product.category}
                </span>
                <h3 className="text-lg font-bold text-gray-800 mt-2 mb-3">{product.name}</h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                        ⭐
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.reviews})</span>
                </div>

                {/* Price and Button */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">{product.price}</span>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
                    เพิ่มลงตะกร้า
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Card 2: Profile Card */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">2. Profile Card (การ์ดโปรไฟล์)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'สมชาย ใจดี', role: 'Full Stack Developer', avatar: '👨‍💻', followers: '2.5K', following: '180', posts: '324', bg: 'from-blue-500 to-cyan-500' },
            { name: 'สมหญิง รักเมือง', role: 'UX/UI Designer', avatar: '👩‍🎨', followers: '3.8K', following: '256', posts: '512', bg: 'from-pink-500 to-rose-500' },
            { name: 'สมศักดิ์ รักเรียน', role: 'Data Scientist', avatar: '👨‍🔬', followers: '1.9K', following: '142', posts: '289', bg: 'from-green-500 to-emerald-500' },
            { name: 'นภา สวยงาม', role: 'Marketing Manager', avatar: '👩‍💼', followers: '4.2K', following: '312', posts: '645', bg: 'from-purple-500 to-indigo-500' }
          ].map((profile, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              {/* Cover */}
              <div className={`h-32 bg-gradient-to-r ${profile.bg}`}></div>

              {/* Avatar */}
              <div className="relative px-6 pb-6">
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-5xl border-4 border-white shadow-xl">
                    {profile.avatar}
                  </div>
                </div>

                {/* Info */}
                <div className="mt-12 text-center">
                  <h3 className="text-xl font-bold text-gray-800">{profile.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{profile.role}</p>

                  {/* Stats */}
                  <div className="flex items-center justify-around mt-6 py-4 border-t border-gray-100">
                    <div>
                      <div className="text-xl font-bold text-gray-800">{profile.followers}</div>
                      <div className="text-xs text-gray-500">Followers</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-800">{profile.following}</div>
                      <div className="text-xs text-gray-500">Following</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-800">{profile.posts}</div>
                      <div className="text-xs text-gray-500">Posts</div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all font-semibold">
                      ติดตาม
                    </button>
                    <button className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold">
                      ข้อความ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Card 3: Blog Card */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">3. Blog Card (การ์ดบล็อก)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: '10 เทคนิคการเขียน CSS ให้มีประสิทธิภาพ', excerpt: 'เรียนรู้เทคนิคการเขียน CSS ที่จะช่วยให้เว็บไซต์ของคุณโหลดเร็วขึ้นและดูแลรักษาง่ายขึ้น', author: 'สมชาย ใจดี', date: '15 ม.ค. 2567', readTime: '5 นาที', category: 'CSS', image: '🎨', color: 'blue' },
            { title: 'React Hooks ที่ควรรู้จักในปี 2024', excerpt: 'แนะนำ React Hooks ที่นิยมใช้งานและมีประโยชน์ในการพัฒนา Web Application สมัยใหม่', author: 'สมหญิง รักเมือง', date: '12 ม.ค. 2567', readTime: '8 นาที', category: 'React', image: '⚛️', color: 'cyan' },
            { title: 'เริ่มต้นกับ TypeScript สำหรับมือใหม่', excerpt: 'คู่มือเริ่มต้นใช้งาน TypeScript พร้อมตัวอย่างการใช้งานจริง เหมาะสำหรับผู้เริ่มต้น', author: 'สมศักดิ์ รักเรียน', date: '10 ม.ค. 2567', readTime: '12 นาที', category: 'TypeScript', image: '📘', color: 'indigo' }
          ].map((blog, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group">
              {/* Image */}
              <div className={`relative h-48 bg-gradient-to-br from-${blog.color}-400 to-${blog.color}-600 flex items-center justify-center overflow-hidden`}>
                <span className="text-8xl group-hover:scale-110 transition-transform duration-300">{blog.image}</span>
                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-bold text-gray-700">
                  {blog.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                    {blog.author.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-800">{blog.author}</div>
                    <div className="text-xs text-gray-500">{blog.date} · {blog.readTime}</div>
                  </div>
                </div>

                {/* Button */}
                <button className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:text-white transition-all font-semibold">
                  อ่านเพิ่มเติม
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Card 4: Stats Card */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">4. Stats Card (การ์ดสถิติ)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'ยอดขายรวม', value: '฿2,450,000', change: '+12.5%', trend: 'up', icon: '💰', color: 'from-green-500 to-emerald-600', bgColor: 'bg-green-50' },
            { title: 'ผู้ใช้งานใหม่', value: '8,254', change: '+8.2%', trend: 'up', icon: '👥', color: 'from-blue-500 to-cyan-600', bgColor: 'bg-blue-50' },
            { title: 'คำสั่งซื้อ', value: '1,426', change: '-3.1%', trend: 'down', icon: '📦', color: 'from-orange-500 to-red-600', bgColor: 'bg-orange-50' },
            { title: 'อัตราคงอยู่', value: '84.3%', change: '+5.7%', trend: 'up', icon: '📊', color: 'from-purple-500 to-pink-600', bgColor: 'bg-purple-50' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              {/* Icon and Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center text-3xl shadow-lg`}>
                  {stat.icon}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  stat.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {stat.change}
                </span>
              </div>

              {/* Stats */}
              <div>
                <h3 className="text-sm text-gray-600 mb-2">{stat.title}</h3>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-gray-800">{stat.value}</span>
                  <span className={`mb-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.trend === 'up' ? '↑' : '↓'}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className={`mt-4 h-2 ${stat.bgColor} rounded-full overflow-hidden`}>
                <div className={`h-full bg-gradient-to-r ${stat.color} rounded-full`} style={{ width: '65%' }}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Card 5: Pricing Card */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">5. Pricing Card (การ์ดราคา)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              name: 'Basic',
              price: '฿299',
              period: '/เดือน',
              description: 'เหมาะสำหรับผู้เริ่มต้น',
              features: ['พื้นที่ 10 GB', 'แบนด์วิธ 100 GB', 'อีเมล 5 บัญชี', 'Support พื้นฐาน'],
              color: 'from-gray-500 to-gray-600',
              buttonColor: 'bg-gray-600 hover:bg-gray-700',
              popular: false
            },
            {
              name: 'Pro',
              price: '฿599',
              period: '/เดือน',
              description: 'เหมาะสำหรับธุรกิจขนาดกลาง',
              features: ['พื้นที่ 50 GB', 'แบนด์วิธ ไม่จำกัด', 'อีเมล ไม่จำกัด', 'Support 24/7', 'SSL Certificate', 'Backup ทุกวัน'],
              color: 'from-blue-500 to-purple-600',
              buttonColor: 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700',
              popular: true
            },
            {
              name: 'Enterprise',
              price: '฿1,299',
              period: '/เดือน',
              description: 'เหมาะสำหรับองค์กรขนาดใหญ่',
              features: ['พื้นที่ 200 GB', 'แบนด์วิธ ไม่จำกัด', 'อีเมล ไม่จำกัด', 'Priority Support', 'SSL Certificate', 'Backup ทุกวัน', 'CDN Global', 'Custom Domain'],
              color: 'from-orange-500 to-red-600',
              buttonColor: 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700',
              popular: false
            }
          ].map((plan, idx) => (
            <div
              key={idx}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 ${
                plan.popular ? 'ring-4 ring-blue-500 scale-105' : 'hover:scale-105'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 text-xs font-bold">
                  ⭐ ยอดนิยม
                </div>
              )}

              {/* Header */}
              <div className={`bg-gradient-to-r ${plan.color} text-white p-8 text-center`}>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm opacity-90 mb-4">{plan.description}</p>
                <div className="flex items-end justify-center gap-1">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-lg mb-2 opacity-75">{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3">
                      <span className="text-green-500 text-xl">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button className={`w-full py-3 ${plan.buttonColor} text-white rounded-lg transition-all font-bold text-lg shadow-lg hover:shadow-xl`}>
                  เลือกแพ็คเกจนี้
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl p-8 text-white">
        <h3 className="text-3xl font-bold mb-4">สรุปตัวอย่างทั้งหมด</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div className="bg-white bg-opacity-20 backdrop-blur rounded-xl p-4 text-center">
            <div className="text-4xl mb-2">🛍️</div>
            <div className="text-sm font-semibold">Product Cards</div>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur rounded-xl p-4 text-center">
            <div className="text-4xl mb-2">👤</div>
            <div className="text-sm font-semibold">Profile Cards</div>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur rounded-xl p-4 text-center">
            <div className="text-4xl mb-2">📝</div>
            <div className="text-sm font-semibold">Blog Cards</div>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur rounded-xl p-4 text-center">
            <div className="text-4xl mb-2">📊</div>
            <div className="text-sm font-semibold">Stats Cards</div>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur rounded-xl p-4 text-center">
            <div className="text-4xl mb-2">💳</div>
            <div className="text-sm font-semibold">Pricing Cards</div>
          </div>
        </div>
      </div>
    </div>
  );
}
