'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreateNews() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publishDate: new Date().toISOString().split('T')[0],
    coverImage: null as File | null,
    content: '',
    sourceLink: '',
    tags: [] as string[],
  });

  const [tagInput, setTagInput] = useState('');
  const [coverImagePreview, setCoverImagePreview] = useState<string>('');
  const [insertedImages, setInsertedImages] = useState<string[]>([]);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle cover image upload
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, coverImage: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle insert image in content
  const handleInsertImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setInsertedImages([...insertedImages, imageUrl]);

        const textarea = contentRef.current;
        if (textarea) {
          const cursorPos = textarea.selectionStart;
          const textBefore = formData.content.substring(0, cursorPos);
          const textAfter = formData.content.substring(cursorPos);
          const imageMarkdown = `\n\n![รูปภาพ](${imageUrl})\n\n`;

          setFormData({
            ...formData,
            content: textBefore + imageMarkdown + textAfter
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Add tag
  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  // Remove tag
  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  // Text formatting functions
  const insertFormatting = (before: string, after: string = '') => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end);
    const textBefore = formData.content.substring(0, start);
    const textAfter = formData.content.substring(end);

    const newText = textBefore + before + selectedText + after + textAfter;
    setFormData({ ...formData, content: newText });

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        end + before.length
      );
    }, 0);
  };

  // Handle form submit - บันทึกเป็นแบบร่าง
  const handleSaveDraft = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('บันทึกแบบร่าง:', { ...formData, status: 'draft' });
    alert('บันทึกแบบร่างเรียบร้อยแล้ว!');
    router.push('/news-editor');
  };

  // Handle publish
  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('เผยแพร่ข่าว:', { ...formData, status: 'published' });
    alert('เผยแพร่ข่าวเรียบร้อยแล้ว!');
    router.push('/news-editor');
  };

  // Render preview content
  const renderPreview = () => {
    if (!formData.content) return null;

    return formData.content.split('\n').map((line, index) => {
      // Render headers
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-lg font-bold mt-4 mb-2">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-bold mt-4 mb-2">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-2xl font-bold mt-4 mb-2">{line.replace('# ', '')}</h1>;
      }
      // Render images
      if (line.includes('![') && line.includes('](')) {
        const match = line.match(/!\[.*?\]\((.*?)\)/);
        if (match) {
          return <img key={index} src={match[1]} alt="Content" className="max-w-full h-auto rounded-lg my-4" />;
        }
      }
      // Render lists
      if (line.startsWith('- ')) {
        return <li key={index} className="ml-6">{line.replace('- ', '')}</li>;
      }
      if (line.match(/^\d+\. /)) {
        return <li key={index} className="ml-6 list-decimal">{line.replace(/^\d+\. /, '')}</li>;
      }
      // Render quotes
      if (line.startsWith('> ')) {
        return <blockquote key={index} className="border-l-4 border-gray-300 pl-4 italic my-2">{line.replace('> ', '')}</blockquote>;
      }
      // Render normal text with formatting
      let formattedLine = line;
      formattedLine = formattedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      formattedLine = formattedLine.replace(/\*(.*?)\*/g, '<em>$1</em>');
      formattedLine = formattedLine.replace(/~~(.*?)~~/g, '<del>$1</del>');
      formattedLine = formattedLine.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>');

      return line ? (
        <p key={index} className="mb-2" dangerouslySetInnerHTML={{ __html: formattedLine }} />
      ) : (
        <br key={index} />
      );
    });
  };

  return (
    <div className="p-8 max-w-full">
      {/* Header with Back Button */}
      <div className="mb-8">
        <Link href="/news-editor">
          <button className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            กลับไปหน้าจัดการข่าว
          </button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">เพิ่มข่าวใหม่</h1>
        <p className="text-gray-600">สร้างและแก้ไขข่าวสารด้วย Text Editor พร้อมตัวอย่าง</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Form */}
        <div className="space-y-6">
          <form className="space-y-6">
            {/* Cover Image Section */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                รูปภาพหน้าปก
              </label>

              {coverImagePreview ? (
                <div className="relative">
                  <img
                    src={coverImagePreview}
                    alt="Cover preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, coverImage: null });
                      setCoverImagePreview('');
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverImageChange}
                    className="hidden"
                    id="coverImage"
                  />
                  <label htmlFor="coverImage" className="cursor-pointer">
                    <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-600">คลิกเพื่ออัปโหลดรูปภาพหน้าปก</p>
                    <p className="text-sm text-gray-400 mt-2">PNG, JPG, GIF (สูงสุด 5MB)</p>
                  </label>
                </div>
              )}
            </div>

            {/* Title Section */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <label htmlFor="title" className="block text-lg font-semibold text-gray-800 mb-4">
                หัวข้อข่าว
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="กรอกหัวข้อข่าวที่น่าสนใจ..."
                className="w-full px-4 py-3 text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Author and Date Section */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="author" className="block text-lg font-semibold text-gray-800 mb-4">
                    ผู้ลงข่าว
                  </label>
                  <input
                    type="text"
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="ชื่อผู้เขียน/ผู้ลงข่าว"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="publishDate" className="block text-lg font-semibold text-gray-800 mb-4">
                    วันที่ลงข่าว
                  </label>
                  <input
                    type="date"
                    id="publishDate"
                    value={formData.publishDate}
                    onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Content Editor Section */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                เนื้อหาข่าว
              </label>

              {/* Toolbar */}
              <div className="flex flex-wrap gap-2 mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <button
                  type="button"
                  onClick={() => insertFormatting('# ', '')}
                  className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors text-sm font-semibold"
                  title="หัวข้อใหญ่"
                >
                  H1
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('## ', '')}
                  className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors text-sm font-semibold"
                  title="หัวข้อรอง"
                >
                  H2
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('### ', '')}
                  className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors text-sm font-semibold"
                  title="หัวข้อเล็ก"
                >
                  H3
                </button>
                <div className="w-px bg-gray-300 mx-1"></div>
                <button
                  type="button"
                  onClick={() => insertFormatting('**', '**')}
                  className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors font-bold"
                  title="ตัวหนา"
                >
                  B
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('*', '*')}
                  className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors italic"
                  title="ตัวเอียง"
                >
                  I
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('~~', '~~')}
                  className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors line-through"
                  title="ขีดฆ่า"
                >
                  S
                </button>
                <div className="w-px bg-gray-300 mx-1"></div>
                <button
                  type="button"
                  onClick={() => insertFormatting('\n- ', '')}
                  className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                  title="รายการแบบจุด"
                >
                  • List
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('\n1. ', '')}
                  className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                  title="รายการแบบตัวเลข"
                >
                  1. List
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('\n> ', '')}
                  className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                  title="ข้อความอ้างอิง"
                >
                  " Quote
                </button>
                <div className="w-px bg-gray-300 mx-1"></div>
                <button
                  type="button"
                  onClick={() => insertFormatting('[ข้อความ](', ')')}
                  className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                  title="แทรกลิงก์"
                >
                  🔗 Link
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-2 bg-blue-500 text-white border border-blue-600 rounded hover:bg-blue-600 transition-colors"
                  title="แทรกรูปภาพ"
                >
                  🖼️ แทรกรูป
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleInsertImage}
                  className="hidden"
                />
              </div>

              {/* Content Textarea */}
              <textarea
                ref={contentRef}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="เขียนเนื้อหาข่าวของคุณที่นี่...

คุณสามารถ:
- แบ่งย่อหน้าโดยกด Enter 2 ครั้ง
- ใช้ Toolbar ด้านบนเพื่อจัดรูปแบบข้อความ
- แทรกรูปภาพระหว่างเนื้อหา
- เขียนในรูปแบบ Markdown"
                className="w-full h-96 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                required
              />
            </div>

            {/* Source Link Section */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <label htmlFor="sourceLink" className="block text-lg font-semibold text-gray-800 mb-4">
                ลิงก์ที่มา (ถ้ามี)
              </label>
              <input
                type="url"
                id="sourceLink"
                value={formData.sourceLink}
                onChange={(e) => setFormData({ ...formData, sourceLink: e.target.value })}
                placeholder="https://example.com/source-article"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Tags Section */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                แท็กข่าว
              </label>

              {/* Quick Tag Buttons */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">ประเภทข่าวยอดนิยม:</p>
                <div className="flex flex-wrap gap-2">
                  {['เทคโนโลยี', 'กีฬา', 'การเมือง', 'เศรษฐกิจ', 'บันเทิง', 'สุขภาพ', 'การศึกษา', 'ท่องเที่ยว'].map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        if (!formData.tags.includes(category)) {
                          setFormData({
                            ...formData,
                            tags: [...formData.tags, category]
                          });
                        }
                      }}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors border border-gray-300 hover:border-blue-400"
                    >
                      #{category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tag Input */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  placeholder="หรือเพิ่มแท็กของคุณเอง (กด Enter)"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  เพิ่ม
                </button>
              </div>

              {/* Tags Display */}
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-blue-600"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="flex-1 bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors font-semibold text-lg"
              >
                💾 บันทึกแบบร่าง
              </button>
              <button
                type="button"
                onClick={handlePublish}
                className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold text-lg"
              >
                ✓ เผยแพร่ข่าว
              </button>
            </div>
          </form>
        </div>

        {/* Right Column - Preview */}
        <div className="lg:sticky lg:top-8 lg:self-start">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 pb-4 border-b border-gray-200">
              ✨ ตัวอย่างเนื้อหา
            </h3>

            {/* Preview Cover Image */}
            {coverImagePreview && (
              <div className="mb-6">
                <img
                  src={coverImagePreview}
                  alt="Cover preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}

            {/* Preview Title */}
            {formData.title && (
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-3">
                  {formData.title}
                </h1>
                {/* Author and Date Info */}
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  {formData.author && (
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>โดย <span className="font-semibold">{formData.author}</span></span>
                    </div>
                  )}
                  {formData.publishDate && (
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{new Date(formData.publishDate).toLocaleDateString('th-TH', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Preview Content */}
            {formData.content ? (
              <div className="prose max-w-none">
                {renderPreview()}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-400">เริ่มเขียนเนื้อหาเพื่อดูตัวอย่าง</p>
              </div>
            )}

            {/* Preview Source Link */}
            {formData.sourceLink && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">ที่มา:</span>{' '}
                  <a href={formData.sourceLink} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    {formData.sourceLink}
                  </a>
                </p>
              </div>
            )}

            {/* Preview Tags */}
            {formData.tags.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-2">แท็ก:</p>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
