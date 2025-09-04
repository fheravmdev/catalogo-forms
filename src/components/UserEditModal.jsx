import { useState, useEffect } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Table, TableBody, TableCell, TableHead, TableRow, IconButton, TextField, Backdrop, CircularProgress
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { removeUserRole, addUserRole } from "../services/users";
import RecursoPermissionsTable from "./RecursoPermissionsTable";
import { removeFormPermission } from "../services/formularios";
import { removeFilePermission } from "../services/files";

function UserEditModal({ open, onClose, user: userData, refresh }) {
    const [newRole, setNewRole] = useState("");
    const [roles, setRoles] = useState([]);
    const [archivos, setArchivos] = useState([]);
    const [formularios, setFormularios] = useState([])
    const [loading, setLoading] = useState(false);
    const [recursos, setRecursos] = useState([]);

    //Si el usuario cambia (traído desde el parent), actualizo el componente
    useEffect(() => {
        if (userData) {
            console.log(userData)
            setRoles(userData.user.roles || []);
            setArchivos(userData.archivos || []);
            setFormularios(userData.formularios || [])
            const recursos = []
            userData.archivos.map(archivo =>
                recursos.push({ id: archivo.idArchivo, nombre: archivo.nombre, permisos: archivo.permisos, tipo: "archivo" })
            )
            userData.formularios.map(form =>
                recursos.push({ id: form.idFormulario, nombre: form.nombre, permisos: form.permisos, tipo: "formulario" })
            )
            setRecursos(recursos)
            console.log(recursos)
        }
    }, [userData]);


    const handleRemoveRole = async (role) => {
        try {
            setLoading(true);
            await removeUserRole(userData.user.idUser, role);
            setRoles(roles.filter(r => r !== role));
            refresh();
        } catch (err) {
            console.log(err)
            setLoading(false)
        } finally {
            setLoading(false);
        }
    };

    const handleAddRole = async () => {
        if (newRole && !roles.includes(newRole)) {
            try {
                setLoading(true);
                await addUserRole(userData.user.idUser, newRole);
                setRoles([...roles, newRole]);
                setNewRole("");
                refresh();
            } catch (err) {
                console.log(err)
                setLoading(false)
            } finally {
                setLoading(false);
            }
        }
    };

    const handleRemoveRecurso = async (recurso) => {
        try {
            const idRecurso = recurso.id;
            setLoading(true);
            if (recurso.tipo == "archivo") {
                await removeFilePermission(userData.user.idUser, idRecurso);
                setArchivos(archivos.filter(a => a.idArchivo !== idRecurso));
            }
            if (recurso.tipo == "formulario") {
                await removeFormPermission(userData.user.idUser, idRecurso);
                setFormularios(formularios.filter(f => f.idFormulario !== idRecurso));
            }
            refresh();
        } catch (err) {
            console.log(err)
            setLoading(false)

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
            <DialogTitle>Editar usuario: {userData.user.username}</DialogTitle>
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
                <RecursoPermissionsTable
                    recursos={recursos}
                    handleRemoveRecurso={handleRemoveRecurso}
                    refresh={refresh}
                >

                </RecursoPermissionsTable>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cerrar</Button>
            </DialogActions>
        </Dialog>
    );
}

export default UserEditModal;
