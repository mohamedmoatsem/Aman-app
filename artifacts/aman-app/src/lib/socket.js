import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || window.location.origin;

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  transports: ['websocket', 'polling'],
  withCredentials: true,
});

export const connectSocket = (userId) => {
  if (!socket.connected) {
    socket.auth = { userId };
    socket.connect();
    socket.emit('login', userId);
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

socket.on('connect', () => {
  console.log('✅ Socket connected');
});

socket.on('disconnect', (reason) => {
  console.log('🔌 Socket disconnected:', reason);
});

socket.on('connect_error', (err) => {
  console.error('❌ Socket error:', err.message);
});
