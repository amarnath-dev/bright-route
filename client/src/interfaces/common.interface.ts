import { Dispatch, SetStateAction } from "react";

export interface Conversation {
  members: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CurrentUser {
  email: string;
  first_name: string;
  role: string;
  _id: string;
}

export interface SigninCredential {
  email: string;
  password: string;
}

export interface Message {
  _id: string;
  IsDeleted: boolean;
  conversationId: string;
  createdAt: number;
  senderId: string;
  text: string;
  type: string;
}

export interface CurrentChat {
  _id: string;
  members: [];
  createdAt: string;
}

export interface MessagesProps {
  message: Message;
  own: boolean;
  index: number;
  currentChat: CurrentChat | null;
  userId: string | undefined;
}

interface Notification {
  content: string;
  createdAt: number;
  senderId: string;
  type: string;
}

export interface NotificationProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  notData: Notification | null;
}
