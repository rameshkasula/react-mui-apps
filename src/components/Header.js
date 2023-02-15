import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "../App";

import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Button } from "@mui/material";

export default function Header() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const pages = [
    { name: "Home", path: "/app" },
    {
      name: "Tasks",
      path: "/tasks",
    },
    { name: "Reports", path: "/reports" },
  ];

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    window.location.href = "/auth/signin";
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <Sidebar /> */}
          <Typography
            variant="h6"
            component={Link}
            to={"/app"}
            sx={{ flexGrow: 1, textDecoration: "none", color: "#fff" }}
          >
            Task Sheet
          </Typography>
          {pages.map((item) => (
            <Typography
              key={item?.name}
              variant="body"
              component={Link}
              to={item?.path}
              style={{ textDecoration: "none" }}
              color="inherit"
              sx={{ mx: 1 }}
            >
              {item?.name}
            </Typography>
          ))}

          <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
