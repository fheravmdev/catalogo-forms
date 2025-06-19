import { Box, Typography, Paper, Grid, TextField, MenuItem, Button, Backdrop, CircularProgress } from "@mui/material";
import { useRef, useState } from "react";
import FileInput from "./FileInput";

import { uploadFile } from "../services/files";

function FileUpload({handleFilesChanged}) {
    const [file, setFile] = useState(null)
    const [tipoArchivo, setTipoArchivo] = useState('Seleccionar...')
    const [descripcion, setDescripcion] = useState('')
    const [area, setArea] = useState('Seleccionar...')
    const [loading, setLoading] = useState(false)
    const formRef = useRef()

    const handleFileUpload = async (e) => {
        try {
            setLoading(true);
            e.preventDefault();
            if (!file || tipoArchivo === "Seleccionar..." || area === "Seleccionar...") return;

            const formData = new FormData();
            formData.append("file", file);
            formData.append("tipo_archivo", tipoArchivo);
            formData.append("descripcion", descripcion);
            formData.append("area", area);

            const result = await uploadFile(formData);
            if (result.success) {
                alert("Archivo subido correctamente");
                setFile(null);
                setTipoArchivo("Seleccionar...");
                setDescripcion("");
                setArea("GESTIÓN HUMANA");
            } else {
                alert("Error al subir archivo: " + (result.error || "Desconocido"));
            }
            handleFilesChanged();
        } catch (error) {
            setLoading(false)
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    const tiposArchivo = ["MANUAL", "CONTRATO", "OTROS"]
    const areas = ["GESTIÓN HUMANA", "CONTRALORIA", "INFORMÁTICA", "CONTABILIDAD"]

    const handleFileChanged = (file) => {
        if (file) setFile(file)
    }

    return (
        <Box padding={1}>
            {loading && (
                <Backdrop
                    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}
            <Paper sx={{ p: 2, mb: 3 }} >
                <Box ref={formRef} component="form" onSubmit={handleFileUpload}>
                    <Grid
                      container
                      direction={{ xs: "column", md: "row" }}
                      spacing={2}
                      sx={{
                        alignItems: "center",
                        justifyContent: "start",
                        marginBottom: 0
                      }}
                    >
                        <Grid xs={12} md="auto">
                            <FileInput handleFileChanged={handleFileChanged} />
                        </Grid>
                        {file && (
                            <>
                                <Grid xs={12} md="auto">
                                    <Typography variant="body1" gutterBottom >Subiendo: {file.name}</Typography>
                                </Grid>
                                <Grid xs={12} md="auto">
                                    <TextField 
                                        select
                                        label="Tipo de archivo"
                                        value={tipoArchivo}
                                        onChange={(e) => { setTipoArchivo(e.target.value) }}
                                        required
                                        fullWidth
                                        sx={{ minWidth: { md: 180 } }}
                                    >
                                        <MenuItem value="Seleccionar...">
                                            <em>Seleccionar...</em>
                                        </MenuItem>
                                        {tiposArchivo.map(tipo => (
                                            <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid xs={12} md="auto">
                                    <TextField
                                        select
                                        label="Área"
                                        value={area}
                                        onChange={e => setArea(e.target.value)}
                                        required
                                        fullWidth
                                        sx={{ minWidth: { md: 180 } }}
                                    >
                                        <MenuItem value="Seleccionar...">
                                            <em>Seleccionar...</em>
                                        </MenuItem>
                                        {areas.map(a => (
                                            <MenuItem key={a} value={a}>{a}</MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid xs={12} md="auto" sx={{ flex: 1 }}>
                                    <TextField
                                        label="Descripción del archivo"
                                        autoComplete='off'
                                        value={descripcion}
                                        onChange={(e) => { setDescripcion(e.target.value) }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid xs={12} md="auto">
                                    <Button
                                        type="submit"
                                        fullWidth
                                        sx={{ backgroundColor: "#673ab7" }}
                                        variant="contained"
                                    >
                                        Subir archivo
                                    </Button>
                                </Grid>
                            </>
                        )}
                    </Grid>
                </Box>
            </Paper>
        </Box>
    );
}

export default FileUpload;