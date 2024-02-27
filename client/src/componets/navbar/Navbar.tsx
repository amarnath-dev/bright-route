import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
// import PersonAdd from "@mui/icons-material/PersonAdd";
// import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import Cookies from "js-cookie";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { user } = useAppSelector((state) => state.userAuth);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
        <div className="col-span-4 bg-blue-500 h-14 flex items-center"></div>
        <div className="col-span-8 bg-blue-500 h-14">
          <div className="flex justify-evenly items-center text-white">
            <span>Link1</span>
            <span>Link1</span>
            <span>Link1</span>
            <div className="mt-2">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>
                      {user?.first_name.charAt(0)}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleClose}>
                  <div>
                    <small>Signed in as</small>
                    <h1 className="font-bold">{user?.email}</h1>
                  </div>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <div
                    className="flex flex-row items-center w-full"
                    onClick={toProfile}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>
                      {user?.first_name.charAt(0)}
                    </Avatar>
                    My account
                  </div>
                </MenuItem>
                <Divider />
                {/* <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add another account
                </MenuItem> */}
                {/* <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem> */}
                <div className="bg-green-200" onClick={handleLogout}>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </div>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
