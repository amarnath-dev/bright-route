import { Conversations } from "../../componets/conversation/Conversations";
import SendIcon from "@mui/icons-material/Send";
import { Messages } from "../../componets/message/Messages";
import React, { useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import { useAppSelector } from "../../app/hooks";
import { Socket, io } from "socket.io-client";
import { useParams } from "react-router-dom";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import VideoChatIcon from "@mui/icons-material/VideoChat";
import { Link } from "react-router-dom";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../../app/firebase";
import CloseIcon from "@mui/icons-material/Close";
import "../../app/GlobalStyles.css";
import NavBar from "../../componets/navbar/Navbar";

interface Message {
  _id: string;
  IsDeleted: boolean;
  conversationId: string;
  createdAt: number;
  senderId: string;
  text: string;
  type: string;
}

interface CurrentChat {
  _id: string;
  members: [];
  createdAt: string;
}

// const HOST = "https://bright-route.online";
const HOST = "http://localhost:3000";
const MenteeMessages = () => {
  const axiosPrivate = useAxiosPrivate();
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState<CurrentChat | null>(null);
  const { user } = useAppSelector((state) => state.userAuth);

  const { mentorId, menteeID } = useParams();

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState<Message | null>(null);
  const scrollRef = React.useRef<HTMLInputElement>(null);
  const socket = useRef<Socket | null>(null);
  const [imoji, setImoji] = useState<boolean>(false);

  const [openImg, setOpenImg] = useState<boolean>();
  const [currentImg, setCurrentImg] = useState("");

  //Connecting to the Server
  useEffect(() => {
    socket.current = io(HOST);
    socket.current?.emit("addUser", user?._id);
    socket.current?.on("getUsers", (users) => {
      console.log("Current Usres", users);
    });
  }, [user]);

  useEffect(() => {
    socket?.current?.emit("typing", currentChat?.members);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessage]);

  useEffect(() => {
    if (!newMessage) {
      socket.current?.emit("notTyping", currentChat?.members);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessage]);

  useEffect(() => {
    socket.current?.on("getTyping", () => {
      console.log("TYPING");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket.current]);

  useEffect(() => {
    socket.current?.on("getNoTyping", () => {
      console.log("Not Typing...");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket.current]);

  useEffect(() => {
    socket?.current?.on("getMessage", (data) => {
      console.log("Arrival Message -> ", data);
      setArrivalMessage(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket?.current]);

  // Creating a new Conversation
  useEffect(() => {
    const createConversation = async () => {
      try {
        const response = await axiosPrivate.post(
          "chat/conversation",
          { receiverId: mentorId ? mentorId : menteeID, senderId: user?._id },
          { withCredentials: true }
        );
        if (response.data) {
          if (mentorId) {
            const conversations = await axiosPrivate.get(
              `chat/mentee/conversation/${user?._id}/${mentorId}`,
              {
                withCredentials: true,
              }
            );
            console.log("-->", conversations.data);
            if (conversations.data) {
              setConversation(conversations.data.conversation);
              setCurrentChat(conversations.data.conversation?.[0]);
            }
          } else {
            const conversations = await axiosPrivate.get(
              `chat/mentor/conversation/${user?._id}/${menteeID}`,
              {
                withCredentials: true,
              }
            );
            console.log("-->", conversations.data);
            if (conversations.data) {
              setConversation(conversations.data.conversation);
              setCurrentChat(conversations.data.conversation[0]);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    createConversation();
  }, [axiosPrivate, menteeID, mentorId, user?._id]);

  useEffect(() => {
    // arrivalMessage &&
    //   currentChat?.members.includes(arrivalMessage?.senderId as never) &&
    //   setMessages((prev) => [...prev, arrivalMessage]);
    if (
      arrivalMessage &&
      currentChat?.members.includes(arrivalMessage?.senderId as never)
    ) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat, currentChat?.members]);

  //Fetching both users all conversations.
  useEffect(() => {
    try {
      const fetchConversationMessages = async () => {
        const response = await axiosPrivate.get(
          `chat/allConversation/${currentChat?._id}`
        );
        if (response.data) {
          setMessages(response.data.allMessages);
        }
      };
      fetchConversationMessages();
    } catch (error) {
      console.log(error);
    }
  }, [conversation, axiosPrivate, user?._id, currentChat?._id, currentChat]);

  //Sending the new message
  const handleSubmit = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!newMessage && !currentImg) {
      return;
    }
    try {
      if (openImg && currentImg) {
        const message = {
          senderId: user?._id,
          text: currentImg,
          conversationId: currentChat?._id,
          type: "image",
        };
        const receiverId = currentChat?.members.find(
          (userId: string) => userId !== user?._id
        );
        const response = await axiosPrivate.post("chat/message", message, {
          withCredentials: true,
        });
        if (response) {
          socket.current?.emit("sendMessage", {
            ...response.data.savedMessage,
            receiverId,
          });
          setMessages([...messages, response.data.savedMessage]);
          setCurrentImg("");
          setOpenImg(false);
        }
      }
      if (newMessage) {
        const message = {
          senderId: user?._id,
          text: newMessage,
          conversationId: currentChat?._id,
          type: "text",
        };
        const receiverId = currentChat?.members.find(
          (userId: string) => userId !== user?._id
        );
        const response = await axiosPrivate.post("chat/message", message, {
          withCredentials: true,
        });
        if (response) {
          socket.current?.emit("sendMessage", {
            ...response.data.savedMessage,
            receiverId,
          });
        }
        setMessages([...messages, response.data.savedMessage]);
        setNewMessage("");
      }

      //chat notification sending
      try {
        const receiverId = currentChat?.members.find(
          (userId: string) => userId !== user?._id
        );
        const ChatMessage = {
          userId: receiverId,
          content: "You have New Message 🔔",
          role: "mentor",
          messageType: "new chat",
          senderId: user?._id,
        };
        const response = await axiosPrivate.post(
          `/notification/chatNotification/${user?._id}`,
          { ChatMessage },
          { withCredentials: true }
        );
        if (response) {
          socket.current?.emit("sendNotification", {
            senderId: user?._id,
            receiverId: receiverId,
            content: "You have a New Message 🔔",
            type: "chat message",
          });
        } else {
          console.log("Chat notification send failed");
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //To Scroll Down to the Bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleImoji = () => {
    setImoji((state) => !state);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const emojiPickerButton = document.getElementById("imoji-btn");
    const emojiPicker = document.getElementById("imoji-picker");
    if (
      emojiPickerButton &&
      emojiPicker &&
      !emojiPickerButton.contains(event?.target as HTMLButtonElement) &&
      !emojiPicker.contains(event?.target as HTMLButtonElement)
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

  const handleImojiClick = (emojiData: EmojiClickData) => {
    const imoji = emojiData.emoji;
    if (imoji) {
      setNewMessage((prevMessage) => prevMessage + imoji);
    } else {
      console.log("emoji is not available");
    }
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const blob = new Blob([file], { type: file.type });
      const imgId =
        Math.random().toString(16).slice(2) +
        (new Date().getTime() / 1000).toString();
      const reference = ref(storage, imgId);
      const snapshot = await uploadBytes(reference, blob);
      if (snapshot) {
        const imageId = snapshot.metadata?.fullPath;
        setCurrentImg(imageId);
        if (imageId) {
          const imageRef = ref(storage, imageId);
          setOpenImg(true);
          getDownloadURL(imageRef)
            .then((url: string) => {
              const img = document.getElementById(
                "chat_img_main"
              ) as HTMLImageElement;
              img.src = url;
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
      e.target.value = "";
    }
  };

  const handleClose = () => {
    const imageRef = ref(storage, currentImg);
    deleteObject(imageRef)
      .then(() => {
        setOpenImg(false);
      })
      .catch((error: unknown) => {
        console.log("Error Occured", error);
      });
  };
  useEffect(() => {
    setOpenImg(false);
  }, []);

  //To Scroll Down to the Bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <NavBar />
      <div className="grid grid-cols-12 h-full bg-background-two">
        <div className="col-span-3 px-1 py-1"></div>
        <div className="col-span-12 md:col-span-6 bg-gray-800 rounded-md">
          <div className="flex flex-col items-center justify-center w-full min-h-screen text-gray-800 rounded">
            <div className="w-full" id="chat_header">
              {conversation.map((c, index) => {
                return (
                  <>
                    <div key={index} className="flex">
                      <Conversations
                        conversation={c}
                        currentUser={user}
                        index={index}
                      />
                      <div className="flex justify-center items-center px-4">
                        {user?.role === "mentee" && (
                          <Link
                            to={`/video/${mentorId}`}
                            className="border rounded-md text-gray-400 bg-gray-900 px-4 py-4"
                            target="_blank"
                          >
                            <VideoChatIcon />
                          </Link>
                        )}
                        {user?.role === "mentor" && (
                          <>
                            <Link
                              to={`/video/${menteeID}`}
                              className="border rounded-md text-gray-400 bg-gray-900 px-4 py-4"
                              target="_blank"
                            >
                              <VideoChatIcon />
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
            <div id="imoji-picker">
              {imoji && <EmojiPicker onEmojiClick={handleImojiClick} />}
            </div>
            <div className="flex flex-col flex-grow w-full bg-green shadow-xl rounded-lg overflow-hidden">
              <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
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

              {openImg ? (
                <div className="bg-gray-100 border-2 flex justify-center px-3 py-3">
                  <img
                    id="chat_img_main"
                    src=""
                    className="object-cover h-40"
                  />
                  <span className="px-2 cursor-pointer" onClick={handleClose}>
                    <CloseIcon className="border-2 rounded" />
                  </span>
                </div>
              ) : (
                ""
              )}

              <div className="flex items-center px-1 w-full mb-4">
                <div className="px-2 hover:bg-gray-300 rounded-full">
                  <span className="hidden">
                    <input
                      type="file"
                      src={currentImg ? currentImg : ""}
                      id="imageFile"
                      onChange={handleImage}
                    />
                  </span>
                  <span
                    onClick={() => {
                      document.getElementById("imageFile")?.click();
                    }}
                  >
                    <AttachFileIcon className="text-gray-400" />
                  </span>
                </div>
                <input
                  type="text"
                  id="messageInput"
                  placeholder="Type a message..."
                  className="w-full rounded-l h-10 pl-2 bg-gray-800 text-white"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <div>
                  <span
                    className="px-2 py-2"
                    onClick={handleImoji}
                    id="imoji-btn"
                  >
                    <SentimentSatisfiedIcon className="text-gray-400" />
                  </span>
                </div>
                <div
                  className="bg-gray-800 rounded-r h-10 flex items-center px-2 cursor-pointer hover:bg-slate-300"
                  onClick={handleSubmit}
                >
                  <SendIcon className="text-gray-400" />
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
