import { ListSubheader, Paper, List, ListItemButton, ListItemText, ListItemIcon, ListItem, Box, Tooltip } from "@mui/material";
import TableViewIcon from '@mui/icons-material/TableView';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import useAuth from "../hooks/useAuth";
function AreaFormsGroup({ area, forms, colors }) {
    const { auth } = useAuth();
    return (
        <Paper
            elevation={2}
        >
            <List
                sx={{ width: '100%', bgcolor: 'background.paper', borderTop: `5px solid ${colors.top}` }}
                subheader={
                    <ListSubheader component="div" sx={{ fontWeight: 'bold', color: "black", fontSize: "1.2rem" }}>
                        {area}
                    </ListSubheader>
                }
            >
                {forms.map(form => {
                    return (
                            <Box key={form.idFormulario} display={"flex"} justifyContent="flex-end">
                                <ListItem>
                                    <ListItemText primary={form.nombre} ></ListItemText>
                                    <Box
                                        display={"flex"}
                                        maxWidth={"150px"}
                                        justifyContent={"flex-end"}
                                    >
                                        <Tooltip title="Ir a responder"><ListItemButton key={form.res_url} onClick={() => window.open(form.res_url, '_blank').focus()}><ExitToAppIcon /></ListItemButton></Tooltip>
                                        {form.edit_url ? (
                                            <Tooltip title="Ir a tabla">
                                                <ListItemButton key={form.edit_url} onClick={() => window.open(form.edit_url, '_blank').focus()}><TableViewIcon /></ListItemButton>
                                            </Tooltip>
                                        ) : null}
                                    </Box>
                                </ListItem>
                            </Box>
                    )

                })}

            </List>
        </Paper>
    )
}

export default AreaFormsGroup