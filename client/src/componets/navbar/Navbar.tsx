import { Avatar, Dropdown, Navbar } from "flowbite-react";

import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import Cookies from "js-cookie";

const NavBar = () => {
  const { user } = useAppSelector((state) => state.userAuth);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const toProfile = () => {
    navigate("/managment");
  };

  const handleLogout = async () => {
    const response = await axiosPrivate.delete("/logout", {
      withCredentials: true,
    });
    console.log(response.data.status);
    if (response.data.status === "success") {
      Cookies.remove("accessToken");
      navigate("/signin");
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
                        img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
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
                  <Navbar.Link href="#" active>
                    Home
                  </Navbar.Link>
                  <Navbar.Link href="#">About</Navbar.Link>
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
