import { IoMdClose } from "react-icons/io";
import { format } from "timeago.js";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import "../../app/GlobalStyles.css";

interface Notification {
  content: string;
  createdAt: number;
  senderId: string;
  type: string;
}

export interface NotificationProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  notData: Notification | null;
}

interface NotificationMentor {
  _id: string;
  content: string;
  isDeleted: boolean;
  isVisited: boolean;
  messageType: string;
  role: string;
  userId: string;
  createdAt: string;
}

const Notification: React.FC<NotificationProps> = ({ setOpen, notData }) => {
  const [notifications, setNotifications] = useState<NotificationMentor[] | []>(
    []
  );
  const { user } = useAppSelector((state) => state.userAuth);
  const axiosPrivate = useAxiosPrivate();

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
  }, [notData, user?._id, axiosPrivate]);

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
      <div className="w-96 h-screen shadow-lg rounded-lg bg-gray-800 overflow-y-scroll px-5 py-2">
        <div className="text-start font-bold text-gray-700 flex justify-between">
          <h1 className="py-2 px-2 text-xl text-gray-400">Alerts</h1>
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
              {notifications?.map(
                (notification: NotificationMentor, index: number) => {
                  return (
                    <div
                      className="px-2 py-1 w-full hover:bg-slate-300 cursor-pointer rounded-md"
                      key={index}
                    >
                      {notification?.isDeleted ? (
                        ""
                      ) : (
                        <>
                          <div>
                            <span className="flex justify-end">
                              <MdDelete
                                className="text-xl text-gray-400 rounded-full"
                                onClick={() => handleDelete(notification?._id)}
                              />
                            </span>
                            <p
                              className="text-gray-400 rounded-md px-2"
                              key={index}
                              // onClick={() => messageClick(notification)}
                            >
                              {notification?.content}
                            </p>
                            <small className="text-black px-2">
                              {format(notification?.createdAt)}
                            </small>
                          </div>
                        </>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          ) : (
            <>
              <div>
                <h1 className="text-black px-4 py-4 text-xl text-gray-400">
                  No Notifications
                </h1>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Notification;
