import { IoMdClose } from "react-icons/io";
import { format } from "timeago.js";
import { axiosPrivate } from "../../api";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";

export interface Props {
  setOpen: boolean;
}
const Notification = ({ setOpen, notData, mentorMessages }) => {
  const [notifications, setNotifications] = useState();
  const { user } = useAppSelector((state) => state.userAuth);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axiosPrivate.get(
          `/notification/getNotifications/${user?._id}`,
          {
            withCredentials: true,
          }
        );
        setNotifications(response.data.notifications);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, [notData, user?._id]);

  const handleDelete = async (notificationId: string) => {
    try {
      const response = await axiosPrivate.delete(
        `/notification/delete/${notificationId}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.status === "success") {
        const updatedNot = notifications?.map((obj) => {
          if (obj?._id === notificationId) {
            return { ...obj, isDeleted: true };
          }
          return obj;
        });
        setNotifications(updatedNot);
        toast.success("Notification Deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-96 h-screen shadow-lg rounded-lg bg-slate-200 overflow-y-scroll">
        <div className="text-start font-bold text-gray-700 flex justify-between">
          <h1 className="py-2 px-2 text-xl">Alerts</h1>
          <span className="px-1 py-2">
            <IoMdClose
              className="text-3xl cursor-pointer rounded-full hover:bg-gray-400"
              onClick={handleClose}
            />
          </span>
        </div>
        <div className="flex justify-start items-start flex-col mx-1 my-1">
          {notifications?.length > 0 ? (
            <div className="flex-wrap rounded-lg w-full">
              {notifications?.map((notification, index: number) => {
                return (
                  <div
                    className="px-2 py-1 w-full hover:bg-slate-300 cursor-pointer rounded-md"
                    key={index}
                  >
                    {notification?.isDeleted ? (
                      ""
                    ) : (
                      <>
                        <span className="flex justify-end">
                          <MdDelete
                            className="text-xl text-gray-700 hover:bg-gray-800 hover:text-white rounded-full"
                            onClick={() => handleDelete(notification?._id)}
                          />
                        </span>
                        <p className="text-black rounded-md px-2" key={index}>
                          {notification?.content}
                        </p>
                        <small className="text-black px-2">
                          {format(notification?.createdAt)}
                        </small>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <>
              <div>
                <h1 className="text-black px-4 py-4 text-xl">
                  No Notifications
                </h1>
              </div>
            </>
          )}
        </div>
        {mentorMessages ? (
          <>
            <div>
              <p>You have one new message!🔔</p>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Notification;
