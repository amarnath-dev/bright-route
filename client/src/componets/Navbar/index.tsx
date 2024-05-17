import Cookies from "js-cookie";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useContext, useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../config/firebase";
import { IoNotifications } from "react-icons/io5";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import Notification from "../Notification";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { BsPersonLinesFill } from "react-icons/bs";
import Logo from "../../assets/images/logo.png";
import SocketContext from "../../context/socketContext";
import NoImage from "../../assets/images/no-profile-image.png";
import { NotType } from "../../interfaces/mentor.interface";

const NavBar = () => {
  const socket = useContext(SocketContext);
  const { user } = useAppSelector((state) => state.userAuth);
  const [profileImg, setProfileImg] = useState<string>();
  const [firebaseImgId, setFirebaseImgId] = useState<string>();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [open, setOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotType | null>(null);

  // Connecting to the Server
  useEffect(() => {
    socket?.current?.on("getNotification", (data) => {
      setNotifications({
        senderId: data?.senderId,
        content: data?.content,
        type: data?.type,
        createdAt: Date.now(),
      });
    });
  }, [socket]);

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

  useEffect(() => {
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
  }, [profileImg, axiosPrivate]);

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
  const handleHistory = () => {
    if (user?.role === "mentor") {
      navigate("/mentor/history");
    }
    if (user?.role === "mentee") {
      navigate("/history");
    }
  };
  return (
    <>
      <div className="grid grid-cols-12 w-full items-center sticky shadow-lg z-10">
        <div className="col-span-4 bg-gray-800 h-16 flex items-center">
          <img
            src={Logo}
            className="w-16 md:py-6 md:ml-10 cursor-pointer px-2 md:px-0"
            alt="logo"
            onClick={logoClick}
          />
        </div>
        <div className="col-span-8 bg-gray-800 h-16">
          <div className="flex justify-end items-center text-gray-400">
            <div className="flex">
              <div className="flex gap-4 md:gap-7 items-center">
                <div
                  onClick={handleHistory}
                  className={open ? "hidden" : "block"}
                >
                  <FaHistory className="text-2xl hover:text-blue-600 text-gray-400" />
                </div>

                {user?.role === "mentor" ? (
                  <div
                    onClick={handleClickOne}
                    className={open ? "hidden" : "block"}
                  >
                    <BsPersonLinesFill className="text-3xl text-gray-400 hover:text-blue-600 cursor-pointer" />
                  </div>
                ) : (
                  ""
                )}

                <div
                  onClick={handleClickTwo}
                  className={open ? "hidden" : "block"}
                >
                  {user?.role === "mentor" ? (
                    <IoChatboxEllipsesOutline className="text-3xl hover:text-blue-600 cursor-pointer text-gray-400" />
                  ) : (
                    <>
                      <FaChalkboardTeacher className="text-3xl hover:text-blue-600 text-gray-400" />
                    </>
                  )}
                </div>
                <div className={open ? "hidden" : "block"}>
                  <span className="cursor-pointer">
                    <IoNotifications
                      className="text-3xl hover:text-blue-600 text-gray-400"
                      onClick={handleNotification}
                    />
                  </span>
                </div>
              </div>
              <Navbar fluid rounded className={open ? "hidden" : "block"}>
                <div className="flex">
                  <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                      <Avatar
                        alt="User_settings"
                        img={firebaseImgId ? firebaseImgId : NoImage}
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
                <Notification
                  setOpen={setOpen}
                  notData={notifications ? notifications : null}
                />
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
