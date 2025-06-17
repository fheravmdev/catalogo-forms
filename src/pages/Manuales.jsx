import { Grid } from "@mui/material"
import TrabajoEnCurso from "../components/TrabajoEnCurso"
import useAuth from "../hooks/useAuth"


function Manuales() {
    return (
        <Grid xs={12} md={4} sx={{ position: "absolute", top: "calc(50% - 284px)", left: "calc(50% - 180px)" }}>
            <TrabajoEnCurso />
        </Grid>
    )
}

export default Manuales