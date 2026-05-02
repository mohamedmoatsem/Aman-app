// artifacts/aman-app/src/lib/socket.js
import { io } from 'socket.io-client';

// تم تعديل الرابط لاستخدام عنوان السيرفر العام في Replit
// ملاحظة: Socket.io يتصل بالرابط الأساسي للسيرفر مباشرة
const SOCKET_URL = 'https://5a3d682b-307d-49a3-9fed-8b83f1db8874-00-14zv8h0j6aqij.kirk.replit.dev';

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  // إضافة إعدادات لضمان استقرار الاتصال عبر Replit
  transports: ['websocket', 'polling'],
  withCredentials: true
});

export const connectSocket = (userId) => {
  if (!socket.connected) {
    // تحديث بيانات الاتصال قبل التشغيل لضمان وجود المعرف
    socket.auth = { userId }; 
    socket.connect();
    socket.emit('login', userId);
    console.log(`📡 محاولة الاتصال للمستخدم: ${userId}`);
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
    console.log('🔌 تم فصل الاتصال يدوياً');
  }
};

// تحسين رسائل المراقبة (Logs) لتظهر بوضوح في التيرمينال عندك
socket.on('connect', () => {
  console.log('✅ تم الاتصال بنجاح بخادم أمان (Socket.IO)');
});

socket.on('disconnect', (reason) => {
  console.log('🔌 انقطع الاتصال، السبب:', reason);
});

socket.on('connect_error', (err) => {
  console.error('❌ خطأ في اتصال Socket.IO:', err.message);
});
