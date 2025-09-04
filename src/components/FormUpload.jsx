import { useState } from "react";
import { Box, Button, Paper, TextField, MenuItem, Typography } from "@mui/material";
import instance from "../axios-instance";
import { createForm } from "../services/formularios";
const AREAS = ["GESTIÓN HUMANA", "CONTRALORIA", "INFORMÁTICA", "CONTABILIDAD"];

function FormUpload({ onUpload }) {
    const [nombre, setNombre] = useState("");
    const [area, setArea] = useState(AREAS[0]);
    const [resUrl, setResUrl] = useState("");
    const [editUrl, setEditUrl] = useState("");
    const [error, setError] = useState("");

    const handleUpload = async (e) => {
        e.preventDefault();
        setError("");
        if (!nombre || !area || !resUrl) {
            setError("Todos los campos son obligatorios");
            return;
        }
        try {
            const res = await createForm(
                { nombre, area, res_url: resUrl, edit_url: editUrl }
            )
            if (res.success) {
                alert("Formulario subido exitosamente!!");
            }
            setNombre(""); setArea(AREAS[0]); setResUrl("");
            if (onUpload) onUpload();
        } catch (err) {
            setError(err?.response?.data?.error || "Error al subir formulario");
        }
    };

    return (
        <Paper sx={{ p: 2, mb: 3 }}>
            <Box component="form" onSubmit={handleUpload} sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <TextField label="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />
                <TextField select label="Área" value={area} onChange={e => setArea(e.target.value)} required>
                    {AREAS.map(a => <MenuItem key={a} value={a}>{a}</MenuItem>)}
                </TextField>
                <TextField label="URL del recurso" value={resUrl} onChange={e => setResUrl(e.target.value)} required sx={{ minWidth: 250 }} />
                <TextField label="URL a la tabla" value={editUrl} onChange={e => setEditUrl(e.target.value)} sx={{ minWidth: 250 }} />
                <Button type="submit" variant="contained">Subir formulario</Button>
            </Box>
            {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
        </Paper>
    );
}

export default FormUpload;
