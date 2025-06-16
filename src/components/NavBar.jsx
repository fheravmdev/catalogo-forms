import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const NavBar = ({ onLogout }) => {
  const { auth } = useAuth();

  //Aquí organizo y gestiono mostrar los menús según roles, asignándoles además la ruta a la que deben dirigir.
  const links = [
    { to: "/", label: "Formularios", show: !!auth?.isAuthenticated },
    { to: "/manuales", label: "Manuales", show: !!auth?.isAuthenticated },
    { to: "/admin", label: "Admin", show: auth?.roles?.includes("ADMIN") },
  ];

  return (
    <AppBar position="static" sx={{ mb: 2, backgroundColor: "#673ab7" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          MLCORP - FORMS
        </Typography>
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
          {auth?.username && (
            <Typography variant="body1" sx={{ ml: 3 }}>
              {auth.username}
            </Typography>
          )}
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