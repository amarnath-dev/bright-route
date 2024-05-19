import { Conversations } from "../../componets/Conversation";
import SendIcon from "@mui/icons-material/Send";
import { Messages } from "../../componets/Messages";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useAppSelector } from "../../hooks/useAppSelector";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import CloseIcon from "@mui/icons-material/Close";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../../config/firebase";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SocketContext from "../../context/socketContext";
import { useContext } from "react";
import { Message } from "../../interfaces/common.interface";
import { CurrentChat } from "../../interfaces/common.interface";
import "../../styles/global-style.css";

const MentorMessages = () => {
  const socket = useContext(SocketContext);
  const axiosPrivate = useAxiosPrivate();
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState<CurrentChat>();
  const { user } = useAppSelector((state) => state.userAuth);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState<Message | null>(null);
  const scrollRef = React.useRef<HTMLInputElement>(null);
  const [imoji, setImoji] = useState<boolean>(false);
  const [openImg, setOpenImg] = useState<boolean>();
  const [currentImg, setCurrentImg] = useState("");

  //Connecting to the Server
  useEffect(() => {
    socket?.current?.on("getMessage", (data) => {
      setArrivalMessage(data);
    });
  }, [socket]);

  //Getting Current user All conversations
  useEffect(() => {
    (async () => {
      try {
        const response = await axiosPrivate.get("chat/conversation", {
          withCredentials: true,
        });
        setConversation(response.data.conversation);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [axiosPrivate]);

  // Creating a new Conversation
  const createConversation = async (conversation: CurrentChat) => {
    try {
      if (conversation.members && Array.isArray(conversation.members)) {
        const menteeId = conversation?.members.find(
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
    (async () => {
      try {
        const response = await axiosPrivate.get(
          `chat/allConversation/${currentChat?._id}`
        );
        if (response.data?.messages) {
          setMessages(response.data.messages);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [conversation, axiosPrivate, user?._id, currentChat?._id]);

  useEffect(() => {
    if (
      arrivalMessage &&
      currentChat?.members.includes(arrivalMessage?.senderId as never)
    ) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, conversation, currentChat?.members]);

  //Sending the new message
  const handleSubmit = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!newMessage && !currentImg) {
      return;
    }
    if (openImg && currentImg) {
      const receiverId = currentChat?.members.find(
        (userId: string) => userId !== user?._id
      );
      if (receiverId !== undefined) {
        socket?.current?.emit("sendMessage", {
          senderId: user?._id,
          receiverId,
          text: currentImg,
          type: "image",
        });
        try {
          const message = {
            senderId: user?._id,
            text: currentImg,
            conversationId: currentChat?._id,
            type: "image",
          };
          const response = await axiosPrivate.post("chat/message", message, {
            withCredentials: true,
          });
          setMessages([...messages, response.data.savedMessage]);
          setNewMessage("");
          setOpenImg(false);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("No reciverId found.");
      }
    }
    if (newMessage) {
      const receiverId = currentChat?.members.find(
        (userId: string) => userId !== user?._id
      );
      if (receiverId !== undefined) {
        socket?.current?.emit("sendMessage", {
          senderId: user?._id,
          receiverId,
          text: newMessage,
          type: "text",
        });
        try {
          const message = {
            senderId: user?._id,
            text: newMessage,
            conversationId: currentChat?._id,
            type: "text",
          };
          const response = await axiosPrivate.post("chat/message", message, {
            withCredentials: true,
          });
          setMessages([...messages, response.data.savedMessage]);
          setNewMessage("");
          setOpenImg(false);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("No reciverId found.");
      }
    }
    //chat notification sending
    try {
      const receiverId = currentChat?.members.find(
        (userId: string) => userId !== user?._id
      );
      const ChatMessage = {
        userId: receiverId,
        content: "You have one new Message 🔔",
        role: "mentee",
        messageType: "new chat",
        senderId: user?._id,
      };
      const response = await axiosPrivate.post(
        `/notification/chatNotification/${user?._id}`,
        { ChatMessage },
        { withCredentials: true }
      );
      if (response) {
        socket?.current?.emit("sendNotification", {
          senderId: user?._id,
          receiverId: receiverId,
          content: "You have a new message 🔔",
          type: "chat message",
        });
      } else {
        console.log("Chat notification send failed");
      }
    } catch (error) {
      console.log(error);
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
  const handleOutsideClick = (event: MouseEvent) => {
    const emojiPickerButton = document.getElementById("imoji-btn");
    const emojiPicker = document.getElementById("imoji-picker");
    if (
      emojiPickerButton &&
      emojiPicker &&
      !emojiPickerButton.contains(event.target as HTMLInputElement) &&
      !emojiPicker.contains(event.target as HTMLInputElement)
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

  return (
    <>
      <div className="grid grid-cols-12 h-full md:h-screen px-3 py-15 bg-background-two">
        <div className="col-span-full md:col-span-3 px-1 py-1">
          <div className="w-full overflow-y-scroll" id="chat_header">
            <div className="rounded-full">
              <h1 className="text-center text-xl font-bold text-white">
                Mentees
              </h1>
            </div>
            {conversation.map((c, index) => {
              console.log(conversation);
              return (
                <div
                  onClick={() => createConversation(c)}
                  className="mt-3 cursor-pointer"
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

        <div className="col-span-12 md:col-span-9 bg-gray-800 h-full rounded-md">
          <div className="flex flex-col items-center justify-center w-full h-screen text-gray-800 rounded relative">
            <div className="w-full absolute">
              <div id="imoji-picker">
                {imoji && <EmojiPicker onEmojiClick={handleImojiClick} />}
              </div>
            </div>
            <div className="flex flex-col flex-grow w-full shadow-xl rounded-lg overflow-hidden h-96 py-8 px-1">
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

                  {openImg && (
                    <div className="bg-gray-800 flex justify-center px-3 py-3">
                      <img
                        id="chat_img_main"
                        src=""
                        className="object-cover h-40"
                      />
                      <span
                        className="px-2 cursor-pointer"
                        onClick={handleClose}
                      >
                        <CloseIcon className="border-2 rounded text-gray-400" />
                      </span>
                    </div>
                  )}

                  <div className="flex items-center px-1 w-full">
                    <div className="px-1 hover:bg-gray-900 rounded-full">
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
                      placeholder="Type a message..."
                      className="w-full rounded-l h-10 pl-2 bg-gray-800 text-white"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <div>
                      <span
                        className="px-2 py-2 cursor-pointer"
                        id="imoji-btn"
                        onClick={handleImoji}
                      >
                        <SentimentSatisfiedIcon className="text-gray-400" />
                      </span>
                    </div>
                    <div
                      className="bg-gray-800 rounded-r h-10 flex items-center px-2 cursor-pointer"
                      onClick={handleSubmit}
                    >
                      <SendIcon className="text-gray-400" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center mt-10">
                  <span className="font-bold text-xl text-gray-400">
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
