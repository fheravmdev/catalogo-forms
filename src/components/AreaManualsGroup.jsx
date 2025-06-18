import { ListSubheader, Paper, List, ListItemButton, ListItemText } from "@mui/material";

function AreaManualsGroup({ area, manuals, colors }) {
    return (
        <Paper elevation={2}>
            <List
                sx={{ width: '100%', bgcolor: 'background.paper', borderTop: `5px solid ${colors.top}` }}
                subheader={
                    <ListSubheader component="div" sx={{ fontWeight: 'bold', color: "black", fontSize: "1.2rem" }}>
                        {area}
                    </ListSubheader>
                }
            >
                {manuals.map(manual => (
                    <ListItemButton key={manual.idArchivo} onClick={() => window.open(`/download/${manual.idArchivo}`, '_blank').focus()}>
                        <ListItemText primary={manual.nombre} />
                    </ListItemButton>
                ))}
            </List>
        </Paper>
    );
}

export default AreaManualsGroup;