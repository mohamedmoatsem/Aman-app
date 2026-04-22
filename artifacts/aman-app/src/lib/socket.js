// artifacts/aman-app/src/lib/socket.js
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';

export const socket = io(SOCKET_URL, {
  autoConnect: false,
});

export const connectSocket = (userId) => {
  if (!socket.connected) {
    socket.connect();
    socket.emit('login', userId);
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

socket.on('connect', () => console.log('✅ متصل بخادم Socket.IO'));
socket.on('disconnect', () => console.log('🔌 غير متصل بالخادم'));
socket.on('connect_error', (err) => console.error('❌ خطأ اتصال:', err.message));