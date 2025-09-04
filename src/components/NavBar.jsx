import { AppBar, Toolbar, Typography, Button, Box, Drawer, IconButton, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const NavBar = ({ onLogout }) => {
  const { auth } = useAuth();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
    { to: "/me", label: auth.username, show: !!auth?.isAuthenticated },
  ];


  return (
    <>
      <AppBar position="static" sx={{ mb: 2, backgroundColor: "#673ab7" }}>
        <Toolbar>
          {isMobile && (
            <IconButton color="inherit" edge="start" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {pageTitle}  &nbsp;
          </Typography>
          <Typography variant="h6">
            MLCORP - ARCHIVO
          </Typography>
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {links.filter(link => link.show).map(link => (
                <Button
                  key={link.to}
                  color="inherit"
                  component={RouterLink}
                  to={link.to}
                  sx={{ ml: 2 }}
                  startIcon={link.to == '/me' ? <AccountCircleIcon /> : ''}
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
          )}
        </Toolbar>
      </AppBar>
      {auth?.isAuthenticated ? (
        <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <List sx={{ width: 220 }}>
            {links.filter(link => link.show).map(link => (
              <ListItem key={link.label}>
                <Button
                  key={link.to}
                  color="inherit"
                  component={RouterLink}
                  to={link.to}
                  sx={{ ml: 2 }}
                  onClick={() => { setDrawerOpen(false) }}
                  startIcon={link.to == '/me' ? <AccountCircleIcon /> : ''}
                >
                  {link.label}
                </Button>
              </ListItem>
            ))}
            <ListItem>
              {auth?.isAuthenticated && (
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => { setDrawerOpen(false); onLogout() }}
                  sx={{ ml: 3, backgroundColor: "#fff", color: "#673ab7", fontWeight: "bold" }}
                >
                  Cerrar sesión
                </Button>
              )}
            </ListItem>
          </List>
        </Drawer>
      ) : <></>}
    </>
  );
};

export default NavBar;