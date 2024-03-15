import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import { storage } from "../../app/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { Conversation } from "../../datatypes/PropsTypes";
import { CurrentUser } from "../../datatypes/PropsTypes";

interface IUser {
  first_name: string;
  last_name: string;
  job_title: string;
  profile_img: string;
}

interface ConversationProps {
  conversation: Conversation;
  currentUser: CurrentUser | null;
  index: number;
}

export const Conversations: React.FC<ConversationProps> = ({
  conversation,
  currentUser,
  index,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useState<IUser>();
  const [profileImg, setProfileImg] = useState("");

  useEffect(() => {
    const friendId = conversation?.members.find((m: string) => {
      return m !== currentUser?._id;
    });
    const getUser = async () => {
      try {
        const response = await axiosPrivate.get(`/chat/getUser/${friendId}`, {
          withCredentials: true,
        });
        if (response.data) {
          setUser(response.data.friendDetails);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
    const fetchImg = async () => {
      const imageId = user?.profile_img;
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
    };
    fetchImg();
  }, [axiosPrivate, conversation, currentUser, user?.profile_img]);

  return (
    <>
      <div
        key={index}
        className="w-full bg-gray-200 hover:bg-gray-250 rounded-lg px-1 py-1 flex items-center cursor-pointer"
      >
        <div className="md:px-1 md:py-1">
          <img
            id="profile_img"
            alt="profileImg"
            src={
              profileImg
                ? profileImg
                : "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?size=338&ext=jpg&ga=GA1.1.1395880969.1709424000&semt=ais"
            }
            className="h-14 w-14 rounded-full object-cover"
          />
        </div>
        <div className="px-3">
          <h1 className="font-bold">
            {user?.first_name} {user?.last_name}
          </h1>
          <small>{user?.job_title}</small>
        </div>
      </div>
    </>
  );
};
