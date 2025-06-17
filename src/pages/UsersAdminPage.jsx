
import TrabajoEnCurso from "../components/TrabajoEnCurso"
import useAuth from "../hooks/useAuth"
import { Grid } from "@mui/material"

function UsersAdminPage() {
    const {auth} = useAuth()
    return (
        <Grid size={{xs:12, md:4}} sx={{ position: "absolute", top: "calc(50% - 284px)", left: "calc(50% - 180px)", marginTop:"20px"}}>
            <TrabajoEnCurso></TrabajoEnCurso>
        </Grid>
    )
}

export default UsersAdminPage