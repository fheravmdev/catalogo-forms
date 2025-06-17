import { Box, Typography, Paper, Grid, TextField, MenuItem, Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import FileInput from "./FileInput";
import useAuth from "../hooks/useAuth";
import { uploadFile } from "../services/files";

function FileUpload() {
    const [file, setFile] = useState(null)
    const [tipoArchivo, setTipoArchivo] = useState('Seleccionar...')
    const [descripcion, setDescripcion] = useState('')
    const formRef = useRef()
    

    const handleFileUpload = async (e) => {
        e.preventDefault();
        if (!file || tipoArchivo === "Seleccionar...") return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("tipo_archivo", tipoArchivo);
        formData.append("descripcion", descripcion);

        const result = await uploadFile(formData);
        if (result.success) {
            alert("Archivo subido correctamente");
            setFile(null);
            setTipoArchivo("Seleccionar...");
            setDescripcion("");
        } else {
            alert("Error al subir archivo: " + (result.error || "Desconocido"));
        }
    }

    const tiposArchivo = ["MANUAL", "CONTRATO", "OTROS"]

    const handleFileChanged = (file) => {
        if (file) setFile(file)
        console.log(file)
    }

    return (
        <Box padding={1}>
            <Paper sx={{ p: 2, mb: 3 }} >
                <Box ref={formRef} component="form" onSubmit={handleFileUpload}>
                    <Grid container direction="row" spacing={2} sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "start",
                        marginBottom: 0
                    }}>
                        <FileInput handleFileChanged={handleFileChanged} >
                        </FileInput>
                        {file && (
                            <>
                                <Typography variant="body1" gutterBottom >Subiendo: {file.name}</Typography>
                                <TextField select label="Tipo de archivo" value={tipoArchivo} onChange={(e) => { setTipoArchivo(e.target.value) }} required>
                                    <MenuItem value="Seleccionar...">
                                        <em>Seleccionar...</em>
                                    </MenuItem>
                                    {tiposArchivo.map(tipo => {
                                        return (
                                            <MenuItem value={tipo}>{tipo}</MenuItem>
                                        )
                                    })}
                                </TextField>
                                <TextField
                                    label="Descripción del archivo"
                                    sx={{ flex: 1 }}
                                    autoComplete='off'
                                    value={descripcion}
                                    onChange={(e) => { setDescripcion(e.target.value) }}
                                    
                                >

                                </TextField>
                                <Button
                                    type="submit"
                                    fullWidth
                                    sx={{ backgroundColor: "#673ab7" }}
                                    variant="contained"
                                >
                                    Subir archivo
                                </Button>
                            </>
                        )}
                    </Grid>
                </Box>
            </Paper>
        </Box>
    );
}

export default FileUpload;