import { useEffect, useState } from "react"
import { getUsers, resetPassword } from "../services/users"
import { Button, CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UserEditModal from "./UserEditModal";
import LockResetIcon from '@mui/icons-material/LockReset';

function UsersTable() {
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const refresh = () => getUsers(true).then(setUsers);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                setLoading(true);
                const res = await getUsers(true);
                setUsers(res);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    const desactivarUsuario = (idUser)=>{
        console.log(users.find(user => user.user.idUser === idUser))
    }

    const handleResetPassword = async (idUser)=>{
        const res = await resetPassword(idUser);
        if(res.success){
            alert(`La nueva contraseña se ha reiniciado a: ${res.newPass}`)
        }
    }

    const columns = [
        { field: "idUser", headerName: "ID", description: "ID del usuario" },
        { field: "username", headerName: "Usuario", description: "Nombre de usuario" },
        { field: "roles", headerName: "Roles", description: "Tipo de archivo" },
        { field: "acciones", headerName: "Acciones", description: "Acciones disponibles" },
    ];

    return (
        <Paper elevation={1}>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                    <CircularProgress />
                </div>
            ) : (
                <>
                    <TableContainer sx={{ maxHeight: "450px" }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {columns.map(col => {
                                        return (
                                            <TableCell key={col.field}>
                                                {col.headerName}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map(user => {
                                    return (
                                        <TableRow key={user.user.idUser}>
                                            <TableCell>{user.user.idUser}</TableCell>
                                            <TableCell>{user.user.username}</TableCell>
                                            <TableCell>{user.user.roles.join(", ")}</TableCell>
                                            <TableCell>
                                                <Tooltip title="Editar">
                                                    <IconButton onClick={() => setEditUser(user)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Eliminar">
                                                    <IconButton>
                                                        <DeleteIcon onClick={() => {
                                                            desactivarUsuario(user.user.idUser)
                                                        }} />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Reiniciar contraseña">
                                                    <IconButton>
                                                        <LockResetIcon onClick={() => {
                                                            handleResetPassword(user.user.idUser)
                                                        }} />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {editUser && (
                        <UserEditModal
                            open={!!editUser}
                            onClose={() => setEditUser(null)}
                            user={editUser}
                            refresh={refresh}
                        />
                    )}
                </>
            )}
        </Paper>
    );
}

export default UsersTable

