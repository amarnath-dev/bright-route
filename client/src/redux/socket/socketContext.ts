import { RefObject, createContext } from "react";
import { Socket } from "socket.io-client";

const SocketContext = createContext<RefObject<Socket> | null>(null);

export default SocketContext;
