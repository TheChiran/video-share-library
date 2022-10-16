import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate } from "react-router-dom";

export default function Navigation() {
  const navigate = useNavigate();

  const navigateURL = (url) => {
    navigate(`${url}`);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          {localStorage.getItem("accessToken") && (
            <Button color="inherit" onClick={() => navigateURL("/dashboard")}>
              Dashboard
            </Button>
          )}
          <Button color="inherit" onClick={() => navigateURL("/login")}>
            Login
          </Button>

          <Button color="inherit" onClick={() => navigateURL("/register")}>
            Register
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
