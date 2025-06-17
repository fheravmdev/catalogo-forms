import { Box, Typography, Paper, Grid, TextField, MenuItem } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import FileInput from "./FileInput";
import FileUpload from "./FileUpload";
import FilesTable from "./FIlesTable";
import useAuth from "../hooks/useAuth";

function MeFilesTab() {
  const {auth} = useAuth()
  return (
    <Box padding={1}>
      {
        auth?.roles.find(role=> role=="CONTRALORIA" || role=="ADMIN") &&
        <>
          <Typography variant="h6" gutterBottom>Subir un archivo</Typography>

          <FileUpload></FileUpload>
        </>
      }
      <Paper sx={{ p: 2 }}>
        <FilesTable></FilesTable>
      </Paper>
    </Box>
  );
}

export default MeFilesTab;