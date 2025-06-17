import { AppBar, Toolbar, Typography, Button, Box, Drawer } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const NavBar = ({ onLogout }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const routeTitles = {
    "/": "Formularios",
    "/manuales": "Manuales",
    "/admin": "Admin",
    "/me": auth.username
  };

  const pageTitle = !auth?.isAuthenticated
    ? "Inicio de sesión"
    : (routeTitles[location.pathname] || "");

  const links = [
    { to: "/", label: "Formularios", show: !!auth?.isAuthenticated },
    { to: "/manuales", label: "Manuales", show: !!auth?.isAuthenticated },
    { to: "/admin", label: "Admin", show: auth?.roles?.includes("ADMIN") },
    { to: "/me", label: auth.username, show: !!auth?.isAuthenticated  },
  ];

  return (
    <AppBar position="static" sx={{ mb: 2, backgroundColor: "#673ab7" }}>
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Typography variant="h5">
            {pageTitle}  &nbsp;
          </Typography>
          <Typography variant="h6">
            MLCORP - FORMS
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {links.filter(link => link.show).map(link => (
            <Button
              key={link.to}
              color="inherit"
              component={RouterLink}
              to={link.to}
              sx={{ ml: 2 }}
            >
              {link.label}
            </Button>
          ))}
          {auth?.isAuthenticated && (
            <Button
              color="secondary"
              variant="contained"
              onClick={onLogout}
              sx={{ ml: 3, backgroundColor: "#fff", color: "#673ab7", fontWeight: "bold" }}
            >
              Cerrar sesión
            </Button>
          )}
        </Box>
      </Toolbar>

    </AppBar>
  );
};

export default NavBar;