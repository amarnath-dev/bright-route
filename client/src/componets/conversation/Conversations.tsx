import { useEffect, useState } from "react";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import { storage } from "../../app/firebase";
import { getDownloadURL, ref } from "firebase/storage";

export const Conversations = ({ conversation, currentUser, index }) => {
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useState(null);
  const [profileImg, setProfileImg] = useState("");

  useEffect(() => {
    const friendId = conversation.members.find((m) => {
      return m !== currentUser._id;
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
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEYcD_ipeBQ6MAQRs9FvgKVBPV6D-8w7r2s10jUT_Go8Ji0UgRu_3XSBZlK-t85IoZlj4&usqp=CAU"
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
