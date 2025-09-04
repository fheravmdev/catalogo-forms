import { Box, Typography, Paper, Grid, TextField, MenuItem } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import FileInput from "./FileInput";
import FileUpload from "./FileUpload";
import FilesTable from "./FIlesTable";
import useAuth from "../hooks/useAuth";

function MeFilesTab() {
  const {auth} = useAuth()
  const [refresh, setRefresh] = useState(0)
  
  const handleFilesChanged = () => {
    setRefresh(refresh+1)
    console.log(refresh)
  }
  return (
    <Box padding={1}>
      {
        auth?.roles.find(role=> role=="CONTRALORIA" || role=="ADMIN" || role == "LEGAL") &&
        <> {/* Formulario para subir archivos, renderizado si el rol del authContext es CONTRALORIA o ADMIN. */}
          <FileUpload handleFilesChanged={handleFilesChanged} ></FileUpload>
        </>
      }
      <Paper sx={{ p: 2 }}>
        {/* Tabla para ver los archivos a los que el usuario tiene acceso. */}
        <FilesTable parentRefresh={refresh}></FilesTable>
      </Paper>
    </Box>
  );
}

export default MeFilesTab;