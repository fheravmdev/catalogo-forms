import { useState, useEffect } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Table, TableBody, TableCell, TableHead, TableRow, IconButton, TextField, Backdrop, CircularProgress
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { removeUserRole, addUserRole, removeUserFileAccess } from "../services/users";

function UserEditModal({ open, onClose, user, refresh }) {
    const [newRole, setNewRole] = useState("");
    const [roles, setRoles] = useState([]);
    const [archivos, setArchivos] = useState([]);
    const [loading, setLoading] = useState(false);

    // Sincroniza el estado local con la prop user cuando cambia
    useEffect(() => {
        if (user) {
            setRoles(user.roles || []);
            setArchivos(user.archivos || []);
        }
    }, [user]);

    const handleRemoveRole = async (role) => {
        try {
            setLoading(true);
            await removeUserRole(user.idUser, role);
            setRoles(roles.filter(r => r !== role));
            refresh();
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false);
        }
    };

    const handleAddRole = async () => {
        if (newRole && !roles.includes(newRole)) {
            try {
                setLoading(true);
                await addUserRole(user.idUser, newRole);
                setRoles([...roles, newRole]);
                setNewRole("");
                refresh();
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false);
            }
        }
    };

    const handleRemoveFile = async (idArchivo) => {
        try {
            setLoading(true);
            await removeUserFileAccess(user.idUser, idArchivo);
            setArchivos(archivos.filter(a => a.idArchivo !== idArchivo));
            refresh();
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <DialogTitle>Editar usuario: {user.username}</DialogTitle>
            <DialogContent>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Roles</TableCell>
                            <TableCell>Acción</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {roles.map(role => (
                            <TableRow key={role}>
                                <TableCell>{role}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleRemoveRole(role)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell>
                                <TextField
                                    size="small"
                                    value={newRole}
                                    onChange={e => setNewRole(e.target.value)}
                                    placeholder="Nuevo rol"
                                />
                            </TableCell>
                            <TableCell>
                                <IconButton onClick={handleAddRole} disabled={!newRole || roles.includes(newRole)}>
                                    <AddIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Table sx={{ mt: 3 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Archivos con acceso</TableCell>
                            <TableCell>Permisos</TableCell>
                            <TableCell>Acción</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {archivos.map(archivo => (
                            <TableRow key={archivo.idArchivo}>
                                <TableCell>{archivo.nombre}</TableCell>
                                <TableCell>{archivo.permisos.join(", ")}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleRemoveFile(archivo.idArchivo)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cerrar</Button>
            </DialogActions>
        </Dialog>
    );
}

export default UserEditModal;