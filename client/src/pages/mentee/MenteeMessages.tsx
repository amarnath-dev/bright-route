import { Conversations } from "../../componets/conversation/Conversations";
import SendIcon from "@mui/icons-material/Send";
import { Messages } from "../../componets/message/Messages";
import React, { useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import { useAppSelector } from "../../app/hooks";
import { Socket, io } from "socket.io-client";

interface Message {
  senderId: string;
  text: string;
  createdAt: number;
}

const MenteeMessages = () => {
  const axiosPrivate = useAxiosPrivate();
  const [conversation, setConversation] = useState([]);
  const { user } = useAppSelector((state) => state.userAuth);

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState<Message | null>(null);
  const scrollRef = React.useRef<HTMLInputElement>(null);

  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = io("ws://localhost:3000");
    socket.current?.on("getMessage", (data) => {
      setArrivalMessage({
        senderId: data?.senderId,
        text: data?.text,
        createdAt: Date.now(),
      });
      console.log("DATA-->", data);
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      conversation[0].members.includes(arrivalMessage.senderId) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, conversation]);

  useEffect(() => {
    socket.current?.emit("addUser", user?._id);
    socket.current?.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user, socket]);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await axiosPrivate.get("chat/conversation", {
          withCredentials: true,
        });
        if (response.data) {
          setConversation(response.data.conversation);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchConversation();
  }, [axiosPrivate, user?._id]);

  useEffect(() => {
    try {
      const fetchConversationMessages = async () => {
        const response = await axiosPrivate.get(
          `chat/allConversation/${conversation[0]?._id}`
        );
        if (response.data.allMessages) {
          setMessages(response.data.allMessages);
        }
      };
      fetchConversationMessages();
    } catch (error) {
      console.log(error);
    }
  }, [conversation, axiosPrivate]);

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const receiverId = conversation[0]?.members.find(
      (userId: string) => userId !== user?._id
    );
    socket.current?.emit("sendMessage", {
      senderId: user?._id,
      receiverId,
      text: newMessage,
    });
    try {
      const message = {
        senderId: user?._id,
        text: newMessage,
        conversationId: conversation[0]?._id,
      };
      const response = await axiosPrivate.post("chat/message", message, {
        withCredentials: true,
      });
      setMessages([...messages, response.data.savedMessage]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="grid grid-cols-12 h-full bg-gray-600">
        <div className="col-span-3 px-1 py-1"></div>
        <div className="col-span-12 md:col-span-6 bg-white rounded-md">
          <div className="flex flex-col items-center justify-center w-full min-h-screen text-gray-800 rounded">
            <div className="w-full" id="chat_header">
              {conversation.map((c, index) => {
                return (
                  <Conversations
                    conversation={c}
                    currentUser={user}
                    index={index}
                  />
                );
              })}
            </div>
            <div className="flex flex-col flex-grow w-full bg-green shadow-xl rounded-lg overflow-hidden">
              <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
                {messages.map((m, index) => {
                  return (
                    <div ref={scrollRef}>
                      <Messages
                        message={m}
                        own={m?.senderId === user?._id}
                        index={index}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center px-1 w-full mb-4">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="w-full rounded-l h-10 pl-2"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <div
                  className="bg-gray-200 rounded-r h-10 flex items-center px-2 cursor-pointer hover:bg-slate-300"
                  onClick={handleSubmit}
                >
                  <SendIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3"></div>
      </div>
    </>
  );
};

export default MenteeMessages;
