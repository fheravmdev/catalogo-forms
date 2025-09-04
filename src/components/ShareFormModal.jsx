import { useEffect, useState } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Checkbox, FormControlLabel, Autocomplete, TextField,
    Table,
    TableHead,
    TableCell,
    TableContainer,
    TableBody,
    TableRow,
    IconButton,
    Backdrop,
    CircularProgress,
    Box,
    Typography,
    Divider,
    Stack
} from "@mui/material";
import { shareForm, getFormPermissions, deletePermisoForm } from "../services/formularios";
import { getUsers } from "../services/users";
import useAuth from "../hooks/useAuth";
import DeleteIcon from "@mui/icons-material/Delete"

function ShareFormModal({ open, onClose, form }) {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [permDelete, setPermDelete] = useState(false);
    const [permShare, setPermShare] = useState(false);
    const [permEdit, setPermEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const { auth } = useAuth();
    const [existingPerms, setExistingPerms] = useState([]);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                setLoading(true);
                const response = await getUsers(true);
                const roles = [];
                const users = response.map(u => {
                    u.user.roles.forEach(r => {
                        if (roles.find(rolExistente => r == rolExistente)) return;
                        roles.push(r);
                    })
                    return ({
                        idUser: u.user.idUser,
                        username: u.user.username,
                        roles: u.user.roles
                    })
                });
                setUsers(users);
                setRoles(roles);
            } catch (error) {
                alert(error);
            }
            finally {
                setLoading(false);
            }
        }
        if (open) {
            loadUsers();
            setSelectedUsers([]);
            setPermDelete(false);
            setPermShare(false);
            setPermEdit(false);
            getFormPermissions(form.idFormulario).then(setExistingPerms);
        }
    }, [open, form]);

    const handleShare = async () => {
        if (!selectedUsers.length) return;
        setLoading(true);
        const permisos = ["ver"];
        if (permDelete) permisos.push("eliminar");
        if (permShare) permisos.push("compartir");
        if (permEdit) permisos.push("editar")
        for (const u of selectedUsers) {
            for (const permiso of permisos) {
                await shareForm(form.idFormulario, u.idUser, permiso);
            }
        }
        setLoading(false);
        onClose();
    };

    const handleDeletePermiso = async (idPermiso) => {
        setLoading(true);
        try {
            const response = await deletePermisoForm(idPermiso);
            if (response.success) {
                alert("Permiso eliminado con éxito!!!");
            }
        } catch (error) {
            alert(error);
        }
        finally {
            setLoading(false);
        }
    }

    const handleRolSelect = (e, filtrar_rol) => {
        if (e.target?.checked) {
            const users_role = users.filter(u => u.roles.find(r => r == filtrar_rol));
            setSelectedUsers(prev => [...prev, ...users_role.filter(u => !prev.find(pu => pu == u))]);
            return;
        }
        setSelectedUsers(prev => [...prev.filter(u => {
            for(var i = 0; i<u?.roles?.length; i++){
                
                if(u.roles[i] == filtrar_rol){
                    return false;
                }
            }
            return true;
        }
        )])
    }

    if (loading) return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={loading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Compartir formulario: {form?.nombre}</DialogTitle>
            <DialogContent>
                <Stack spacing={2}>
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
                    <Box>
                        <Typography variant="h6">Seleccionar usuarios por rol</Typography>
                        {roles.map(r => {
                            return (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={(e) => handleRolSelect(e, r)}
                                        />
                                    }
                                    label={r}
                                />
                            )
                        })}
                        <Divider></Divider>
                    </Box>
                    <Typography variant="h6">Seleccionar permisos adicionales</Typography>
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
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={permEdit}
                                onChange={e => setPermEdit(e.target.checked)}
                            />
                        }
                        label="Permitir editar"
                    />
                    {existingPerms && (
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Usuario</TableCell>
                                        <TableCell>Permiso</TableCell>
                                        <TableCell>Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {existingPerms.map(p => {
                                        return (
                                            <TableRow key={p.idPermiso}>
                                                <TableCell>{p.username}</TableCell>
                                                <TableCell>{p.permiso}</TableCell>
                                                <TableCell><IconButton onClick={(idPermiso) => handleDeletePermiso(p.idPermiso)}><DeleteIcon></DeleteIcon></IconButton></TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Stack>
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
