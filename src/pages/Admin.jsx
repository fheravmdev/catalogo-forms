import TrabajoEnCurso from "../components/TrabajoEnCurso"
import useAuth from "../hooks/useAuth"
import { Grid } from "@mui/material"
import { Outlet, Link } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText, Box } from "@mui/material";

const drawerWidth = 200;
const appBarHeight = 64;

function Admin() {
    const { auth } = useAuth()
    return (
        <Box sx={{ display: "flex" }}>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        top: appBarHeight,
                        height: `calc(100% - ${appBarHeight}px)`,
                    },
                }}
            >
                <List>
                    {/* <ListItem component={Link} to="/admin/">
                        <ListItemText primary="Dashbaord" />
                    </ListItem> */}
                    <ListItem component={Link} to="/admin/files">
                        <ListItemText primary="Gestionar archivos" />
                    </ListItem>
                    <ListItem component={Link} to="/admin/users">
                        <ListItemText primary="Gestionar usuarios" />
                    </ListItem>
                    <ListItem component={Link} to="/admin/forms">
                        <ListItemText primary="Gestionar formularios" />
                    </ListItem>
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: `${appBarHeight}px` }}>
                <Outlet />
            </Box>
        </Box>
    )
}

export default Admin

/*
import TrabajoEnCurso from "../components/TrabajoEnCurso"
import useAuth from "../hooks/useAuth"
import { Grid } from "@mui/material"
<Grid xs={12} md={4} sx={{ position: "absolute", top: "calc(50% - 284px)", left: "calc(50% - 180px)" }}>
            <div>Hola, admin {auth.username}</div>
            <TrabajoEnCurso></TrabajoEnCurso>
        </Grid>
*/