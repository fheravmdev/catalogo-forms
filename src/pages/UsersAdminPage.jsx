import TrabajoEnCurso from "../components/TrabajoEnCurso"
import useAuth from "../hooks/useAuth"
import { Grid } from "@mui/material"
import UsersTable from "../components/UsersTable"
import CreateUserForm from "../components/CreateUserForm"
import { useState } from "react"

function UsersAdminPage() {
    const { auth } = useAuth()
    const [refresh, setRefresh] = useState(0);
    return (
        // <Grid size={{xs:12, md:4}} sx={{ position: "absolute", top: "calc(50% - 284px)", left: "calc(50% - 180px)", marginTop:"20px"}}>
        //     <TrabajoEnCurso></TrabajoEnCurso>
        // </Grid>
        <>
            <CreateUserForm onCreated={() => setRefresh(r => r + 1)} />
            <UsersTable key={refresh} />
        </>
    )
}

export default UsersAdminPage