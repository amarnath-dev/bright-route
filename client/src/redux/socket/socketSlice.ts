// import { Socket } from "socket.io-client";
// import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// type User = {
//   userId: string;
//   socketId: string;
// };

// type SocketState = {
//   connected: boolean;
//   users: User[] | [];
//   socket: Socket | null;
// };

// const initialState: SocketState = {
//   connected: false,
//   users: [],
//   socket: null,
// };

// export const socketSlice = createSlice({
//   name: "socket",
//   initialState,
//   reducers: {
//     setConnected: (state, action: PayloadAction<boolean>) => {
//       state.connected = action.payload;
//     },
//     setUsers: (state, action: PayloadAction<User[] | []>) => {
//       state.users = action.payload;
//     },
//   },
// });

// export const { setUsers, setConnected } = socketSlice.actions;
// export default socketSlice.reducer;
