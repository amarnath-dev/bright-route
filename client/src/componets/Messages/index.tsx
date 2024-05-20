import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../config/firebase";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { format } from "timeago.js";
import { MessagesProps } from "../../interfaces/common.interface";
import NoProfile from "../../assets/images/no-profile-image.png";
import SocketContext from "../../context/socketContext";
import { useContext } from "react";

export const Messages: React.FC<MessagesProps> = ({
  message,
  own,
  index,
  currentChat,
  userId,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [profileImg, setProfileImg] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const socket = useContext(SocketContext);

  useEffect(() => {
    const frndId = currentChat?.members?.find(
      (user: string) => user !== userId
    );
    if (frndId) {
      try {
        const fetchFrnd = async () => {
          const details = await axiosPrivate.get(`chat/getUser/${frndId}`, {
            withCredentials: true,
          });
          if (details.data) {
            const imageId = details.data?.friendDetails?.profile_img;
            if (imageId) {
              const imageRef = ref(storage, imageId);
              getDownloadURL(imageRef)
                .then((url: string) => {
                  setProfileImg(url);
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          }
        };
        fetchFrnd();
      } catch (error) {
        console.log(error);
      }
    }
  }, [axiosPrivate, currentChat?.members, userId]);

  useEffect(() => {
    if (message?.type && message?.type === "image") {
      const imageId = message?.text;
      if (imageId) {
        const imageRef = ref(storage, imageId);
        getDownloadURL(imageRef)
          .then((url: string) => {
            setImageUrls((prevUrls) => {
              const newUrls = [...prevUrls];
              newUrls[index] = url;
              return newUrls;
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [message, index]);

  const handleDelete = async (messageId: string) => {
    Swal.fire({
      text: "Do you want to delete this message ?",
      confirmButtonText: "Yes",
      showCancelButton: true,
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axiosPrivate.patch(
          `/chat/message/delete/${messageId}`,
          { withCredentials: true }
        );
        if (response.data) {
          socket?.current?.emit("messageDeleted", {
            messageId,
            conversationId: currentChat?._id,
          });
        }
      } else {
        return;
      }
    });
  };
  
  return (
    <>
      {own ? (
        <>
          <div
            key={index}
            className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end"
          >
            <div>
              {message?.type === "text" ? (
                <>
                  {message?.IsDeleted ? (
                    <>
                      <div className="bg-blue-400 text-white p-1 rounded-l-lg rounded-br-lg">
                        <h1>You deleted this message</h1>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                          <div className="flex">
                            <p className="text-sm">{message?.text}</p>
                            <>
                              {isHovered && (
                                <span
                                  className="flex cursor-pointer"
                                  onClick={() => handleDelete(message?._id)}
                                >
                                  <DeleteIcon />
                                </span>
                              )}
                            </>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  {message.IsDeleted ? (
                    <>
                      <div className="bg-blue-400 text-white p-1 rounded-l-lg rounded-br-lg">
                        <h1>You deleted this message</h1>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        <img
                          id="chat_img"
                          src={imageUrls[index]}
                          alt="img"
                          className="rounded-md px-1 py-1 bg-gray-300"
                        />
                        <>
                          {isHovered && (
                            <span
                              className="flex cursor-pointer"
                              onClick={() => handleDelete(message?._id)}
                            >
                              <DeleteIcon className="bg-blue-500 rounded text-lg" />
                            </span>
                          )}
                        </>
                      </div>
                    </>
                  )}
                </>
              )}
              <span className="text-xs text-gray-500 leading-none">
                {format(message?.createdAt)}
              </span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div key={index} className="flex w-full mt-2 space-x-3 max-w-xs">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
              <img
                src={profileImg ? profileImg : NoProfile}
                alt="img"
                className="rounded-full"
              />
            </div>
            <div>
              {message?.type === "text" ? (
                <>
                  {message?.IsDeleted ? (
                    <>
                      <div className="bg-gray-400 text-white p-1 rounded-l-lg rounded-br-lg">
                        <h1>This messages has been deleted</h1>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                        <p className="text-sm">{message?.text}</p>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  {message.IsDeleted ? (
                    <>
                      <div className="bg-gray-400 text-white p-1 rounded-l-lg rounded-br-lg">
                        <h1>This messages has been deleted</h1>
                      </div>
                    </>
                  ) : (
                    <>
                      <img
                        id="chat_img"
                        src={imageUrls[index]}
                        alt="img"
                        className="border-2 px-1 py-1 bg-blue-300 rounded-md"
                      />
                    </>
                  )}
                </>
              )}
              <span className="text-xs text-gray-500 leading-none">
                {format(message?.createdAt)}
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
};
