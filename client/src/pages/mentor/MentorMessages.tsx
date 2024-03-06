import { Conversations } from "../../componets/conversation/Conversations";
import SendIcon from "@mui/icons-material/Send";
import { Messages } from "../../componets/message/Messages";
import React, { useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import { useAppSelector } from "../../app/hooks";
import { Socket, io } from "socket.io-client";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";

interface Message {
  senderId: string;
  text: string;
  createdAt: number;
}

const MentorMessages = () => {
  const axiosPrivate = useAxiosPrivate();
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const { user } = useAppSelector((state) => state.userAuth);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState<Message | null>(null);
  const scrollRef = React.useRef<HTMLInputElement>(null);
  const socket = useRef<Socket | null>(null);

  const [imoji, setImoji] = useState<boolean>(false);

  //Connecting to the Server
  useEffect(() => {
    socket.current = io("ws://localhost:3000");
    socket.current?.on("getMessage", (data) => {
      setArrivalMessage({
        senderId: data?.senderId,
        text: data?.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  //Getting Current user All conversations
  useEffect(() => {
    const thisUserConversations = async () => {
      try {
        const response = await axiosPrivate.get("chat/conversation", {
          withCredentials: true,
        });
        setConversation(response.data.conversation);
      } catch (error) {
        console.log(error);
      }
    };
    thisUserConversations();
  }, [axiosPrivate]);

  // Creating a new Conversation
  const createConversation = async (conversation) => {
    try {
      if (conversation.members && Array.isArray(conversation.members)) {
        const menteeId = conversation.members.find(
          (userId: string) => userId !== user?._id
        );
        if (menteeId !== undefined) {
          await axiosPrivate.post(
            "chat/conversation",
            { receiverId: menteeId, senderId: user?._id },
            { withCredentials: true }
          );
          setCurrentChat(conversation);
        } else {
          console.log("No mentee found.");
        }
      } else {
        console.log("conversation.members is undefined or not an array.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Fetching both users all conversations.
  useEffect(() => {
    try {
      const fetchConversationMessages = async () => {
        const response = await axiosPrivate.get(
          `chat/allConversation/${currentChat?._id}`
        );
        if (response.data.allMessages) {
          setMessages(response.data.allMessages);
        }
      };
      fetchConversationMessages();
    } catch (error) {
      console.log(error);
    }
  }, [conversation, axiosPrivate, user?._id, currentChat?._id]);

  //Updating the new messages
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.senderId) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, conversation, currentChat?.members]);

  //Adding the current user to socket.io server
  useEffect(() => {
    socket.current?.emit("addUser", user?._id);
    socket.current?.on("getUsers", (users) => {
      console.log("Chat Users", users);
    });
  }, [user, socket]);

  //Sending the new message
  const handleSubmit = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!newMessage) {
      return;
    }
    const receiverId = currentChat?.members.find(
      (userId: string) => userId !== user?._id
    );
    if (receiverId !== undefined) {
      socket.current?.emit("sendMessage", {
        senderId: user?._id,
        receiverId,
        text: newMessage,
      });
      try {
        const message = {
          senderId: user?._id,
          text: newMessage,
          conversationId: currentChat?._id,
        };
        const response = await axiosPrivate.post("chat/message", message, {
          withCredentials: true,
        });
        setMessages([...messages, response.data.savedMessage]);
        setNewMessage("");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("No reciverId found.");
    }
  };

  //To Scroll Down to the Bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleImojiClick = (emojiData: EmojiClickData) => {
    const imoji = emojiData.emoji;
    if (imoji) {
      setNewMessage((prevMessage) => prevMessage + imoji);
    } else {
      console.log("emoji is not available");
    }
  };
  const handleImoji = () => {
    setImoji((state) => !state);
  };
  const handleOutsideClick = (event) => {
    const emojiPickerButton = document.getElementById("imoji-btn");
    const emojiPicker = document.getElementById("imoji-picker");

    if (
      emojiPickerButton &&
      emojiPicker &&
      !emojiPickerButton.contains(event.target) &&
      !emojiPicker.contains(event.target)
    ) {
      setImoji(false);
    }
  };

  useEffect(() => {
    if (imoji) {
      window.addEventListener("click", handleOutsideClick);
    }
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [imoji]);

  return (
    <>
      <div className="grid grid-cols-12 h-full bg-gray-100">
        <div className="col-span-3 px-1 py-1">
          <div className="w-full" id="chat_header">
            <div className="rounded-full bg-gray-200">
              <h1 className="text-center text-xl font-bold">Mentees</h1>
            </div>
            {conversation.map((c, index) => {
              return (
                <div
                  onClick={() => createConversation(c)}
                  className="mt-3"
                  key={index}
                >
                  <Conversations
                    conversation={c}
                    currentUser={user}
                    index={index}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div id="imoji-picker">
          {imoji && <EmojiPicker onEmojiClick={handleImojiClick} />}
        </div>
        <div className="col-span-12 md:col-span-6 bg-white rounded-md">
          <div className="flex flex-col items-center justify-center w-full min-h-screen text-gray-800 rounded">
            <div className="flex flex-col flex-grow w-full shadow-xl rounded-lg overflow-hidden">
              {currentChat ? (
                <div>
                  <div className="flex flex-col flex-grow p-4 overflow-auto h-screen">
                    {messages.map((m, index) => {
                      return (
                        <div ref={scrollRef} key={index}>
                          <Messages
                            message={m}
                            own={m?.senderId === user?._id}
                            index={index}
                            currentChat={currentChat}
                            userId={user?._id}
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
                    <div>
                      <span
                        className="px-2 py-2"
                        id="imoji-btn"
                        onClick={handleImoji}
                      >
                        <SentimentSatisfiedIcon />
                      </span>
                    </div>
                    <div
                      className="bg-gray-200 rounded-r h-10 flex items-center px-2 cursor-pointer hover:bg-slate-300"
                      onClick={handleSubmit}
                    >
                      <SendIcon />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center mt-10">
                  <span className="font-bold text-xl">
                    Please Select a chat to start messaging
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-3"></div>
      </div>
    </>
  );
};

export default MentorMessages;
