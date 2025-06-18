import { useEffect, useState } from "react"
import { getUsers } from "../services/users"
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UserEditModal from "./UserEditModal";


function UsersTable() {
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);

    const refresh = () => getUsers(true).then(setUsers);

    useEffect(() => {
        refresh();
    }, [])


    const columns = [
        { field: "idUser", headerName: "ID", description: "ID del usuario" },
        { field: "username", headerName: "Usuario", description: "Nombre de usuario" },
        { field: "roles", headerName: "Roles", description: "Tipo de archivo" },
        { field: "acciones", headerName: "Acciones", description: "Acciones disponibles" },
    ]

    return (
        <Paper elevation={1}>
            <TableContainer>
                <Table>
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
                                <TableRow key={user.idUser}>
                                    <TableCell>{user.idUser}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.roles.join(", ")}</TableCell>
                                    <TableCell>
                                        <Tooltip title="Editar">
                                            <IconButton onClick={() => setEditUser(user)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Eliminar">
                                            <IconButton>
                                                <DeleteIcon /> 
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
        </Paper>
    )
}

export default UsersTable