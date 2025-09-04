import { useEffect, useState } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Checkbox, FormControlLabel, Autocomplete, TextField
} from "@mui/material";
import { shareFile } from "../services/files";
import { getUsers } from "../services/users";
import useAuth from "../hooks/useAuth";

function ShareFileModal({ open, onClose, file }) {

    //Los usuarios, y los usuarios seleccionados
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    //Qué tipo de permisos estoy dando
    const [permDelete, setPermDelete] = useState(false);
    const [permShare, setPermShare] = useState(false);
    
    const [loading, setLoading] = useState(false);
    
    //mousequeherramienta misteriosa que nos ayudará ahorita
    const { auth } = useAuth();

    useEffect(() => {
        if (open) {
            /**
             * Cada vez que lo abro:
             * 1. Fetcheo los usuarios (sin los detalles)
             * 2. Limpio todos los campos
             */
            getUsers().then(setUsers);
            setSelectedUsers([]);
            setPermDelete(false);
            setPermShare(false);
        }
    }, [open]);

    const handleShare = async () => {
        if (!selectedUsers.length) return;
        setLoading(true);

        //permisos
        const permisos = ["ver"];
        if (permDelete) permisos.push("eliminar");
        if (permShare) permisos.push("compartir");

        //Mapeo los permisos sobre el archivo a cada usuario
        const permisosArray = selectedUsers.flatMap(u =>
            permisos.map(permiso => ({
                idArchivo: file.idArchivo,
                idUser: u.idUser,
                permiso
            }))
        );
        await shareFile(permisosArray);
        setLoading(false);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Compartir archivo: {file?.nombre}</DialogTitle>
            <DialogContent>
                <Autocomplete
                    multiple //Para poder seleccionar varios usuarios de 1
                    options={users.filter(u => u.username !== auth?.username)} //quitar al usuario mismo de las opciones
                    getOptionLabel={option => option.username}
                    value={selectedUsers}
                    onChange={(_, value) => setSelectedUsers(value)}
                    renderInput={params => (
                        <TextField {...params} label="Usuarios" placeholder="Selecciona usuarios" />
                    )}
                    sx={{ mt: 2, mb: 2 }}
                />
                {/* checkboxes controlados para pemisos de eliminar y compartir */}
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
                <Button onClick={handleShare} disabled={!selectedUsers.length || loading} variant="contained">
                    Compartir
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ShareFileModal;