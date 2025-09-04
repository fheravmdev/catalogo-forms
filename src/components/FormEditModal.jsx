import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from "@mui/material";
import { updateForm } from "../services/formularios";

const AREAS = ["GESTIÓN HUMANA", "CONTRALORIA", "INFORMÁTICA", "CONTABILIDAD"];

function FormEditModal({ open, form, onClose }) {
    const [nombre, setNombre] = useState(form?.nombre || "");
    const [area, setArea] = useState(form?.area || AREAS[0]);
    const [resUrl, setResUrl] = useState(form?.res_url || "");
    const [editUrl, setEditUrl] = useState(form?.edit_url || "");
    const [error, setError] = useState("");

    const handleSave = async () => {
        setError("");
        if (!nombre || !area || !resUrl) {
            setError("Todos los campos son obligatorios");
            return;
        }
        try {

            const res = await updateForm(form.idFormulario, nombre, area, resUrl, editUrl);
            if (res.success) {
                alert('Formulario actualizado exitosamente!')
                onClose();
            }

        } catch (err) {
            setError(err?.response?.data?.error || "Error al actualizar formulario");
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Editar formulario</DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 350 }}>
                <TextField label="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />
                <TextField select label="Área" value={area} onChange={e => setArea(e.target.value)} required>
                    {AREAS.map(a => <MenuItem key={a} value={a}>{a}</MenuItem>)}
                </TextField>
                <TextField label="URL del recurso" value={resUrl} onChange={e => setResUrl(e.target.value)} required autoComplete="off" />
                <TextField label="URL a la tabla" value={editUrl} onChange={e => setEditUrl(e.target.value)} autoComplete="off"/>
                {error && <span style={{ color: 'red' }}>{error}</span>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSave} variant="contained">Guardar</Button>
            </DialogActions>
        </Dialog>
    );
}

export default FormEditModal;
