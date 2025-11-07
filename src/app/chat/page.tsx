'use client';

import { useState, useRef, useEffect } from 'react';

// ประเภทข้อมูล
interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
  senderName: string;
  timestamp: string;
  type: 'text' | 'image' | 'file' | 'link';
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
  isRead: boolean;
}

interface Contact {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  online: boolean;
}

export default function ChatPage() {
  // State
  const [contacts] = useState<Contact[]>([
    {
      id: 1,
      name: 'สมชาย ใจดี',
      avatar: '👨',
      lastMessage: 'สวัสดีครับ วันนี้เป็นอย่างไรบ้างครับ',
      timestamp: '10:30',
      unreadCount: 3,
      online: true
    },
    {
      id: 2,
      name: 'สมหญิง รักเมือง',
      avatar: '👩',
      lastMessage: 'ส่งไฟล์งานให้แล้วนะคะ',
      timestamp: '09:15',
      unreadCount: 0,
      online: true
    },
    {
      id: 3,
      name: 'สมศักดิ์ รักเรียน',
      avatar: '🧑',
      lastMessage: 'ขอบคุณครับ',
      timestamp: 'เมื่อวาน',
      unreadCount: 0,
      online: false
    },
    {
      id: 4,
      name: 'กลุ่มทีมงาน',
      avatar: '👥',
      lastMessage: 'ประชุมพรุ่งนี้ 14:00 น.',
      timestamp: 'เมื่อวาน',
      unreadCount: 5,
      online: true
    }
  ]);

  const [selectedContact, setSelectedContact] = useState<Contact>(contacts[0]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'สวัสดีครับ',
      sender: 'other',
      senderName: 'สมชาย ใจดี',
      timestamp: '10:25',
      type: 'text',
      isRead: true
    },
    {
      id: 2,
      text: 'มีเรื่องอยากปรึกษาหน่อยครับ',
      sender: 'other',
      senderName: 'สมชาย ใจดี',
      timestamp: '10:26',
      type: 'text',
      isRead: true
    },
    {
      id: 3,
      text: 'สวัสดีครับ มีอะไรให้ช่วยไหมครับ',
      sender: 'me',
      senderName: 'ฉัน',
      timestamp: '10:27',
      type: 'text',
      isRead: true
    },
    {
      id: 4,
      text: 'เกี่ยวกับโปรเจคใหม่ครับ',
      sender: 'other',
      senderName: 'สมชาย ใจดี',
      timestamp: '10:28',
      type: 'text',
      isRead: true
    },
    {
      id: 5,
      text: 'https://example.com/project-details',
      sender: 'other',
      senderName: 'สมชาย ใจดี',
      timestamp: '10:29',
      type: 'link',
      isRead: true
    },
    {
      id: 6,
      text: 'ดูตามลิงก์นี้ได้เลยครับ',
      sender: 'other',
      senderName: 'สมชาย ใจดี',
      timestamp: '10:30',
      type: 'text',
      isRead: false
    }
  ]);

  const [messageInput, setMessageInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // อิโมจิยอดนิยม
  const emojis = ['😊', '😂', '❤️', '👍', '🎉', '🔥', '👏', '💯', '🙏', '😍', '🤔', '😢', '😎', '🚀', '⭐', '✨', '💡', '📝', '📁', '🖼️'];

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ส่งข้อความ
  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const isUrl = messageInput.match(/^(https?:\/\/[^\s]+)$/);

    const newMessage: Message = {
      id: messages.length + 1,
      text: messageInput,
      sender: 'me',
      senderName: 'ฉัน',
      timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
      type: isUrl ? 'link' : 'text',
      isRead: false
    };

    setMessages([...messages, newMessage]);
    setMessageInput('');
    setShowEmojiPicker(false);

    // จำลองการพิมพ์ของอีกฝ่าย
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        // จำลองการตอบกลับ
        const replyMessage: Message = {
          id: messages.length + 2,
          text: 'ได้เลยครับ ขอบคุณมากครับ',
          sender: 'other',
          senderName: selectedContact.name,
          timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
          type: 'text',
          isRead: false
        };
        setMessages(prev => [...prev, replyMessage]);

        // อัพเดทสถานะการอ่านหลัง 2 วินาที
        setTimeout(() => {
          setMessages(prev => prev.map(msg => ({ ...msg, isRead: true })));
        }, 2000);
      }, 2000);
    }, 500);
  };

  // ส่งอิโมจิ
  const handleEmojiClick = (emoji: string) => {
    setMessageInput(messageInput + emoji);
  };

  // อัพโหลดรูปภาพ
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newMessage: Message = {
          id: messages.length + 1,
          text: file.name,
          sender: 'me',
          senderName: 'ฉัน',
          timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
          type: 'image',
          fileUrl: reader.result as string,
          isRead: false
        };
        setMessages([...messages, newMessage]);
      };
      reader.readAsDataURL(file);
    }
  };

  // อัพโหลดไฟล์
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: '',
        sender: 'me',
        senderName: 'ฉัน',
        timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
        type: 'file',
        fileName: file.name,
        fileSize: (file.size / 1024).toFixed(2) + ' KB',
        isRead: false
      };
      setMessages([...messages, newMessage]);
    }
  };

  // Render ข้อความ
  const renderMessage = (message: Message) => {
    const isSender = message.sender === 'me';

    return (
      <div
        key={message.id}
        className={`flex items-end gap-2 mb-4 ${isSender ? 'flex-row-reverse' : 'flex-row'}`}
      >
        {/* Avatar */}
        {!isSender && (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm flex-shrink-0">
            {selectedContact.avatar}
          </div>
        )}

        {/* Message Bubble */}
        <div className={`max-w-[70%] ${isSender ? 'items-end' : 'items-start'}`}>
          {/* ข้อความประเภทต่างๆ */}
          {message.type === 'text' && (
            <div className={`px-4 py-2 rounded-2xl ${
              isSender
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-sm'
                : 'bg-gray-200 text-gray-800 rounded-bl-sm'
            }`}>
              <p className="text-sm break-words">{message.text}</p>
            </div>
          )}

          {message.type === 'link' && (
            <div className={`px-4 py-2 rounded-2xl ${
              isSender
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-sm'
                : 'bg-gray-200 text-gray-800 rounded-bl-sm'
            }`}>
              <a
                href={message.text}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm underline break-all ${isSender ? 'text-blue-100' : 'text-blue-600'}`}
              >
                🔗 {message.text}
              </a>
            </div>
          )}

          {message.type === 'image' && (
            <div className="rounded-2xl overflow-hidden border-2 border-gray-200">
              <img
                src={message.fileUrl}
                alt={message.text}
                className="max-w-full max-h-64 object-cover"
              />
            </div>
          )}

          {message.type === 'file' && (
            <div className={`px-4 py-3 rounded-2xl border-2 ${
              isSender
                ? 'bg-blue-50 border-blue-300 rounded-br-sm'
                : 'bg-gray-100 border-gray-300 rounded-bl-sm'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-lg flex items-center justify-center">
                  📄
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{message.fileName}</p>
                  <p className="text-xs text-gray-500">{message.fileSize}</p>
                </div>
                <button className="text-blue-600 hover:text-blue-800">
                  ⬇️
                </button>
              </div>
            </div>
          )}

          {/* Timestamp และ Read Status */}
          <div className={`flex items-center gap-1 mt-1 px-2 ${isSender ? 'justify-end' : 'justify-start'}`}>
            <span className="text-xs text-gray-500">{message.timestamp}</span>
            {isSender && (
              <span className="text-xs">
                {message.isRead ? '✓✓' : '✓'}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - รายชื่อผู้ติดต่อ */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">แชท</h1>
          <div className="mt-3">
            <input
              type="text"
              placeholder="ค้นหาการสนทนา..."
              className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                selectedContact.id === contact.id ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Avatar with Online Status */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl">
                    {contact.avatar}
                  </div>
                  {contact.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>

                {/* Contact Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-gray-800 truncate">{contact.name}</h3>
                    <span className="text-xs text-gray-500">{contact.timestamp}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
                    {contact.unreadCount > 0 && (
                      <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full flex-shrink-0">
                        {contact.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-lg">
                  {selectedContact.avatar}
                </div>
                {selectedContact.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{selectedContact.name}</h2>
                <p className="text-sm text-gray-500">
                  {selectedContact.online ? 'ออนไลน์' : 'ออฟไลน์'}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="โทรศัพท์">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="วิดีโอคอล">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="ข้อมูลเพิ่มเติม">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-gray-100">
          {messages.map(renderMessage)}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-end gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm">
                {selectedContact.avatar}
              </div>
              <div className="px-4 py-2 bg-gray-200 rounded-2xl rounded-bl-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-4">
          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="mb-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex flex-wrap gap-2">
                {emojis.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => handleEmojiClick(emoji)}
                    className="text-2xl hover:scale-125 transition-transform"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-end gap-2">
            {/* Attachment Buttons */}
            <div className="flex gap-1">
              <button
                onClick={() => imageInputRef.current?.click()}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="แนบรูปภาพ"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="แนบไฟล์"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
                className="hidden"
              />

              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="อิโมจิ"
              >
                <span className="text-2xl">😊</span>
              </button>
            </div>

            {/* Message Input */}
            <div className="flex-1 flex gap-2">
              <textarea
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="พิมพ์ข้อความ..."
                rows={1}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  messageInput.trim()
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>

          {/* Hint Text */}
          <p className="text-xs text-gray-500 mt-2 text-center">
            กด Enter เพื่อส่ง, Shift + Enter เพื่อขึ้นบรรทัดใหม่
          </p>
        </div>
      </div>
    </div>
  );
}
