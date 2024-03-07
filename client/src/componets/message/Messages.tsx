import React, { useEffect, useState } from "react";
import { format } from "timeago.js";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../app/firebase";

interface Messages {
  message: object;
  own: boolean;
  index: number;
  currentChat: object | null;
  userId: string | undefined;
}
export const Messages: React.FC<Messages> = ({
  message,
  own,
  index,
  currentChat,
  userId,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [profileImg, setProfileImg] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    console.log("Running...");
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
            const imageId = details?.data?.friendDetails?.profile_img;
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
    console.log("Running...");
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

  return (
    <>
      {own ? (
        <>
          <div
            key={index}
            className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end"
          >
            <div>
              {message.type === "text" ? (
                <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                  <p className="text-sm">{message?.text}</p>
                </div>
              ) : (
                <img id="chat_img" src={imageUrls[index]} alt="img" />
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
                src={
                  profileImg
                    ? profileImg
                    : "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?size=338&ext=jpg&ga=GA1.1.1395880969.1709424000&semt=ais"
                }
                alt="img"
                className="rounded-full"
              />
            </div>
            <div>
              {/* Now the real time has gone  */}
              {message.type === "text" ? (
                <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                  <p className="text-sm">{message?.text}</p>
                </div>
              ) : (
                <img id="chat_img" src={imageUrls[index]} alt="img" />
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
