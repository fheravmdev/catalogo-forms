import { ListSubheader, Paper, List, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";
import { downloadFile } from "../services/files";

function AreaManualsGroup({ area, manuals, colors }) {
    const [loading, setLoading] = useState(false) //por ahora no hago nada con esto ok

    const handleManualClick = async (manual) => {
        console.log(manual)
        try {
            setLoading(true);
            const result = await downloadFile(manual.idArchivo, manual.nombre)

        } catch (error) {
            setLoading(false)
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }


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
                    <ListItemButton key={manual.idArchivo} onClick={() => { handleManualClick(manual) }}>
                        <ListItemText primary={manual.nombre} />
                    </ListItemButton>
                ))}
            </List>
        </Paper>
    );
}

export default AreaManualsGroup;