import { ListSubheader, Paper, List, ListItemButton, ListItemText, ListItemIcon } from "@mui/material";
function AreaFormsGroup({ area, forms, colors}) {

    
    return (
        <Paper
            elevation={2}
        >
            <List
                sx={{ width: '100%', bgcolor: 'background.paper', borderTop: `5px solid ${colors.top}`}}
                subheader={
                    <ListSubheader component="div" sx={{fontWeight: 'bold', color: "black", fontSize: "1.2rem"}}>
                        {area}
                    </ListSubheader>
                }
                >
                {forms.map(form => {
                    return (
                        <ListItemButton key={form.res_url}>
                            <ListItemText primary={form.nombre} onClick={() => window.open(form.res_url, '_blank').focus()}></ListItemText>
                        </ListItemButton>
                    )

                })}

            </List>
        </Paper>
    )
}

export default AreaFormsGroup