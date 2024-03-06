import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../app/firebase";

const NavBar = () => {
  const { user } = useAppSelector((state) => state.userAuth);
  const [profileImg, setProfileImg] = useState<string>();
  const [firebaseImgId, setFirebaseImgId] = useState("");
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

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
        if (response.data.profileImageId) {
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
        console.error("Error fetching profile image:", error);
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
  };
  return (
    <>
      <div className="grid grid-cols-12 w-full items-center sticky shadow-lg">
        <div className="col-span-4 bg-gray-800 h-16 flex items-center"></div>
        <div className="col-span-8 bg-gray-800 h-16">
          <div className="flex justify-end items-center text-white">
            <div>
              <Navbar fluid rounded>
                <div className="flex md:order-2 px-10">
                  <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                      <Avatar
                        alt="User settings"
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
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Item>Earnings</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                      Log out
                    </Dropdown.Item>
                  </Dropdown>
                  <Navbar.Toggle />
                </div>
                <Navbar.Collapse>
                  <Navbar.Link active onClick={handleClickOne}>
                    {user?.role === "mentor" ? "My Mentees" : "Home"}
                  </Navbar.Link>
                  <Navbar.Link onClick={handleClickTwo}>
                    {user?.role === "mentor" ? "Messages" : "About"}
                  </Navbar.Link>
                  <Navbar.Link href="#">Services</Navbar.Link>
                </Navbar.Collapse>
              </Navbar>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
