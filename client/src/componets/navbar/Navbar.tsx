import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../app/firebase";
import { IoNotifications } from "react-icons/io5";
import { FaChalkboardTeacher } from "react-icons/fa";
import Notification from "../Notifications/Notification";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { BsPersonLinesFill } from "react-icons/bs";
import { Socket, io } from "socket.io-client";
import Logo from "../../assets/BRLogo.png";

interface NotType {
  senderId: string;
  content: string;
  createdAt: number;
  type: string;
}

const NavBar = () => {
  const { user } = useAppSelector((state) => state.userAuth);
  const [profileImg, setProfileImg] = useState<string>();
  const [firebaseImgId, setFirebaseImgId] = useState<string>();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [open, setOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotType | null>(null);
  const socket = useRef<Socket | null>(null);

  //Connecting to the Server
  useEffect(() => {
    socket.current = io("ws://localhost:3000");
    socket.current?.on("getNotification", (data) => {
      setNotifications({
        senderId: data?.senderId,
        content: data?.content,
        type: data?.type,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    socket.current?.emit("addUser", user?._id);
  }, [user]);

  const toProfile = () => {
    if (user?.role === "mentee") {
      navigate("/managment");
    }
    if (user?.role === "mentor") {
      navigate("/mentor/profile");
    }
  };
  const handleLogout = async () => {
    const response = await axiosPrivate.delete("/logout", {
      withCredentials: true,
    });
    if (response.data.status === "success") {
      Cookies.remove("accessToken");
      navigate("/signin");
    }
  };
  useEffect(() => {
    const getImg = async () => {
      try {
        const response = await axiosPrivate.get(`/getimage/${user?.role}`, {
          withCredentials: true,
        });
        if (response.data) {
          setProfileImg(response.data.profileImageId);
        }
      } catch (error) {
        console.error("Error fetching profile image ID:", error);
      }
    };
    getImg();
  }, [axiosPrivate, user?.role]);

  if (profileImg) {
    const fetchImg = async () => {
      try {
        const imageId = profileImg;
        const imageRef = ref(storage, imageId);
        const url = await getDownloadURL(imageRef);
        setFirebaseImgId(url);
      } catch (error) {
        console.error(error);
      }
    };
    fetchImg();
  }
  const handleClickOne = () => {
    if (user?.role === "mentor") {
      navigate("/mentor/my-mentees");
    }
  };
  const handleClickTwo = () => {
    if (user?.role === "mentor") {
      navigate("/mentor/chat");
    }
    if (user?.role === "mentee") {
      navigate("/my-mentors");
    }
  };

  const toPlans = () => {
    if (user?.role === "mentor") {
      navigate("/mentor/plans");
    }
  };

  const toPassword = () => {
    if (user?.role === "mentor") {
      navigate("/mentor/managment/password");
    }
  };
  const handleNotification = () => {
    setOpen((state) => !state);
  };
  const logoClick = () => {
    if (user?.role === "mentee") {
      navigate("/");
    } else if (user?.role === "mentor") {
      navigate("/mentor/home");
    } else {
      navigate("/admin/dashboard");
    }
  };
  return (
    <>
      <div className="grid grid-cols-12 w-full items-center sticky shadow-lg z-10">
        <div className="col-span-4 bg-gray-800 h-16 flex items-center">
          <img
            src={Logo}
            className="bg-transparent w-16 py-6 ml-10 text-white font-white cursor-pointer"
            alt="logo"
            onClick={logoClick}
          />
        </div>
        <div className="col-span-8 bg-gray-800 h-16">
          <div className="flex justify-end items-center text-gray-400">
            <div className="flex">
              <div className="flex gap-7 items-center">
                <div onClick={handleClickOne}>
                  {user?.role === "mentor" ? (
                    <BsPersonLinesFill className="text-3xl text-gray-400 hover:text-blue-600 cursor-pointer" />
                  ) : (
                    ""
                  )}
                </div>
                <div onClick={handleClickTwo}>
                  {user?.role === "mentor" ? (
                    <IoChatboxEllipsesOutline className="text-3xl hover:text-blue-600 cursor-pointer text-gray-400" />
                  ) : (
                    <>
                      <FaChalkboardTeacher className="text-3xl hover:text-blue-600 text-gray-400" />
                    </>
                  )}
                </div>
                <div>
                  <span className="cursor-pointer">
                    <IoNotifications
                      className="text-3xl hover:text-blue-600 text-gray-400"
                      onClick={handleNotification}
                    />
                  </span>
                </div>
              </div>
              <Navbar fluid rounded className={open ? "hidden" : "block"}>
                <div className="flex px-2">
                  <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                      <Avatar
                        alt="User_settings"
                        img={firebaseImgId ? firebaseImgId : ""}
                        rounded
                      />
                    }
                  >
                    <Dropdown.Header>
                      <span className="block text-sm">Signed in as</span>
                      <span className="block truncate text-sm font-medium">
                        {user?.email}
                      </span>
                    </Dropdown.Header>
                    <Dropdown.Item onClick={toProfile}>
                      My Profile
                    </Dropdown.Item>

                    {user?.role === "mentor" ? (
                      <Dropdown.Item onClick={toPlans}>My Plans</Dropdown.Item>
                    ) : (
                      ""
                    )}
                    {user?.role === "mentor" ? (
                      <Dropdown.Item onClick={toPassword}>
                        Password
                      </Dropdown.Item>
                    ) : (
                      ""
                    )}

                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                      Log out
                    </Dropdown.Item>
                  </Dropdown>
                  <Navbar />
                </div>
              </Navbar>
              {open ? (
                <Notification setOpen={setOpen} notData={notifications} />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;

//hello how are you
//sdfsdfsadf
//sdfsadf;hsadflh
//sdf;asdfjlkjsadfk
