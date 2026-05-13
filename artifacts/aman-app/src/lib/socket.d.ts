import type { Socket } from "socket.io-client";

export declare const socket: Socket;
export declare function connectSocket(userId: string | number): void;
export declare function disconnectSocket(): void;
