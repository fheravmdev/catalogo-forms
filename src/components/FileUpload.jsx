import { Box, Typography, Paper, Grid, TextField, MenuItem, Button, Backdrop, CircularProgress } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import FileInput from "./FileInput";

import { editFile, uploadFile } from "../services/files";

function FileUpload({ handleFilesChanged, edit = null }) {
    const [file, setFile] = useState(null) //el archivo que se va a cargar

    //información general del archivo
    const [tipoArchivo, setTipoArchivo] = useState('Seleccionar...')
    const [descripcion, setDescripcion] = useState('')
    const [area, setArea] = useState('Seleccionar...')


    const [loading, setLoading] = useState(false)
    const formRef = useRef()

    useEffect(() => {
        if (edit) {
            console.log(edit)
            setArea(edit.area);
            setTipoArchivo(edit.tipo_archivo);
            setDescripcion(edit.descripcion);
        }
    }, [edit])

    //subir el archivo
    const handleFileUpload = async (e) => {
        try {
            setLoading(true);
            e.preventDefault();
            if (!file || tipoArchivo === "Seleccionar..." || area === "Seleccionar...") return;

            //se debe enviar como formData, porque lleva un archivo
            const formData = new FormData();
            formData.append("file", file);
            formData.append("tipo_archivo", tipoArchivo);
            formData.append("descripcion", descripcion);
            formData.append("area", area);
            if (!file || !tipoArchivo || !descripcion || !area) {
                alert("Falta llenar algunos campos!");
                return;
            }
            let result = {};
            if (!edit) {
                result = await uploadFile(formData);
            }
            else {
                result = await editFile(formData, edit.idArchivo);
            }
            if (result.success) {
                alert("Archivo subido correctamente");
                setFile(null);
                setTipoArchivo("Seleccionar...");
                setDescripcion("");
                setArea("GESTIÓN HUMANA");
            } else {
                alert("Error al subir archivo: " + (result.error || "Desconocido"));
            }

            //se manda a llamar el refresher para el parent, en que renderice de nuevo la tabla y todo
            handleFilesChanged();
        } catch (error) {
            setLoading(false)
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    const tiposArchivo = ["MANUAL", "CONTRATO", "FORMATO FÍSICO", "OTROS"] //esto se manejará con bd probablemente en el futuro
    const areas = ["GESTIÓN HUMANA", "CONTRALORIA", "INFORMÁTICA", "CONTABILIDAD"] //esto también
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
                        <Grid size={!edit ? { xs: 12, md: "auto" } : { md: 12, sx: 12 }}>
                            {/* handleFileChanged settea el archivo para renderizar el resto del componente */}
                            <FileInput handleFileChanged={handleFileChanged} />
                        </Grid>
                        {file && (
                            <Grid
                                container
                                direction={{ sm: "column", md: "row" }}
                                spacing={2}
                                sx={{
                                    alignItems: "center",
                                    justifyContent: "start",
                                    marginBottom: 0
                                }}
                            >
                                <Grid size={!edit ? { xs: 12, md: "auto" } : { md: 12, sx: 12 }}>
                                    <Typography variant="body1" gutterBottom >Subiendo: {file.name}</Typography>
                                </Grid>
                                <Grid size={!edit ? { xs: 12, md: "auto" } : { md: 12, sx: 12 }}>
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
                                <Grid size={!edit ? { xs: 12, md: "auto" } : { md: 12, sx: 12 }}>
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
                                <Grid size={!edit ? { xs: 12, md: "auto" } : { md: 12, sx: 12 }} sx={{ flex: 1 }}>
                                    <TextField
                                        label="Descripción del archivo"
                                        autoComplete='off'
                                        value={descripcion || ''}
                                        onChange={(e) => { setDescripcion(e.target.value) }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid size={!edit ? { xs: 12, md: "auto" } : { md: 12, sx: 12 }}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                    >
                                        Subir archivo
                                    </Button>
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </Box>
            </Paper>
        </Box>
    );
}

export default FileUpload;