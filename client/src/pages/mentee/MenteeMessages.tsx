import { Conversations } from "../../componets/conversation/Conversations";
import SendIcon from "@mui/icons-material/Send";
import { Messages } from "../../componets/message/Messages";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import { useAppSelector } from "../../app/hooks";

export const MenteeMessages = () => {
  const axiosPrivate = useAxiosPrivate();
  const [conversation, setConversation] = useState([]);
  const { user } = useAppSelector((state) => state.userAuth);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = React.useRef<HTMLInputElement>(null);

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
  }, [axiosPrivate]);

  useEffect(() => {
    try {
      const fetchConversationMessages = async () => {
        console.log("fetching conversations");
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
  }, [setMessages, conversation, axiosPrivate]);

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
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
    console.log("Running");
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="grid grid-cols-12 h-full bg-gray-600">
        <div className="col-span-3 px-1 py-1"></div>
        <div className="col-span-6 bg-white rounded-md">
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
