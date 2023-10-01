import React, { useState } from "react";
import { useUserAuth } from "./UserAuthContext";
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import logo from "./Logo.png";
import { AccountCircle, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ProfileDialog from "./ProfileDialog";
import Resume from "./Resume";

export default function Home() {
  const { logOut, user } = useUserAuth();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  console.log(user);

  //   const handleClickOpen = () => {};

  //   const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  //   const handleOpenNavMenu = (event) => {
  //     setAnchorElNav(event.currentTarget);
  //   };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  //   const handleCloseNavMenu = () => {
  //     setAnchorElNav(null);
  //   };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfile = () => {
    setAnchorElUser(null);
    setOpen(true);
  };

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <AppBar
        position="fixed"
        color="inherit"
        style={{ borderBottom: "1px solid #ddd", boxShadow: "none" }}
      >
        <Toolbar>
          <img
            src={logo}
            alt="Logo"
            class="logo"
            style={{
              width: "36px",
              height: "36px",
              marginRight: "16px",
              borderRadius: "10px",
            }}
          />
          <div style={{ fontWeight: "bold", letterSpacing: ".75px" }}>
            Mohsin Memon
          </div>
          <div
            style={{
              flexGrow: 1,
            }}
          ></div>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Options">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {user.photoURL ? (
                  <Avatar
                    alt={user.displayName ? user.displayName : user.email}
                    src={user.photoURL}
                    style={{
                      backgroundColor: "grey",
                      boxShadow:
                        "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
                    }}
                  />
                ) : (
                  <AccountCircle style={{ fontSize: "32px" }} />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key={user.uid} disabled>
                {" "}
                {user && user.email}
              </MenuItem>
              <Divider />
              <MenuItem key={"LogOut"} onClick={handleLogOut}>
                <Icon style={{ marginRight: "10px" }}>
                  <Logout />
                </Icon>
                <Typography textAlign="center">Log Out</Typography>
              </MenuItem>
              <Divider />
              <MenuItem key={"Profile"} onClick={handleProfile}>
                <Icon style={{ marginRight: "10px" }}>
                  <AccountCircle />
                </Icon>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
        <ProfileDialog user={user} open={open} setOpen={setOpen} />
      </AppBar>
      <Resume />
    </div>
  );
}
