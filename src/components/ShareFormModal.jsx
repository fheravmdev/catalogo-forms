import { useEffect, useState } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Checkbox, FormControlLabel, Autocomplete, TextField
} from "@mui/material";
import { shareForm, getFormPermissions } from "../services/formularios";
import { getUsers } from "../services/users";
import useAuth from "../hooks/useAuth";

function ShareFormModal({ open, onClose, form }) {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [permDelete, setPermDelete] = useState(false);
    const [permShare, setPermShare] = useState(false);
    const [loading, setLoading] = useState(false);
    const { auth } = useAuth();
    const [existingPerms, setExistingPerms] = useState([]);

    useEffect(() => {
        if (open) {
            getUsers().then(setUsers);
            setSelectedUsers([]);
            setPermDelete(false);
            setPermShare(false);
            getFormPermissions(form.idFormulario).then(setExistingPerms);
        }
    }, [open, form]);

    const handleShare = async () => {
        if (!selectedUsers.length) return;
        setLoading(true);
        const permisos = ["ver"];
        if (permDelete) permisos.push("eliminar");
        if (permShare) permisos.push("compartir");
        for (const u of selectedUsers) {
            for (const permiso of permisos) {
                await shareForm(form.idFormulario, u.idUser, permiso);
            }
        }
        setLoading(false);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Compartir formulario: {form?.nombre}</DialogTitle>
            <DialogContent>
                <Autocomplete
                    multiple
                    options={users.filter(u => u.username !== auth?.username)}
                    getOptionLabel={option => option.username}
                    value={selectedUsers}
                    onChange={(_, value) => setSelectedUsers(value)}
                    renderInput={params => (
                        <TextField {...params} label="Usuarios" placeholder="Selecciona usuarios" />
                    )}
                    sx={{ mt: 2, mb: 2 }}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={permDelete}
                            onChange={e => setPermDelete(e.target.checked)}
                        />
                    }
                    label="Permitir eliminar"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={permShare}
                            onChange={e => setPermShare(e.target.checked)}
                        />
                    }
                    label="Permitir compartir"
                />
                <div style={{ marginTop: 16 }}>
                    <b>Permisos existentes:</b>
                    <ul>
                        {existingPerms.map(p => (
                            <li key={p.idPermiso}>{p.username} - {p.permiso}</li>
                        ))}
                    </ul>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>Cancelar</Button>
                <Button onClick={handleShare} disabled={!selectedUsers.length || loading} variant="contained">
                    Compartir
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ShareFormModal;
