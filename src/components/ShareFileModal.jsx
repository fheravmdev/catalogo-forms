import { useEffect, useState } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel
} from "@mui/material";
import { getUsers, shareFile } from "../services/files";

function ShareFileModal({ open, onClose, file }) {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [permDelete, setPermDelete] = useState(false);
    const [permShare, setPermShare] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            getUsers().then(setUsers);
            setSelectedUser("");
            setPermDelete(false);
            setPermShare(false);
        }
    }, [open]);

    const handleShare = async () => {
        if (!selectedUser) return;
        setLoading(true);
        const permisos = ["ver"];
        if (permDelete) permisos.push("eliminar");
        if (permShare) permisos.push("compartir");
        await shareFile({ idArchivo: file.idArchivo, idUser: selectedUser, permisos });
        setLoading(false);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Compartir archivo: {file?.nombre}</DialogTitle>
            <DialogContent>
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="user-select-label">Usuario</InputLabel>
                    <Select
                        labelId="user-select-label"
                        value={selectedUser}
                        label="Usuario"
                        onChange={e => setSelectedUser(e.target.value)}
                    >
                        {users.map(u => (
                            <MenuItem key={u.idUser} value={u.idUser}>{u.username}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
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
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>Cancelar</Button>
                <Button onClick={handleShare} disabled={!selectedUser || loading} variant="contained">
                    Compartir
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ShareFileModal;