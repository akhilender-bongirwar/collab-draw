import { io } from "socket.io-client";

const ENDPOINT = process.env.NODE_ENV === "production" ? "https://collab-draw-server.onrender.com": "http://localhost:8080";
export const socket = io(ENDPOINT);
