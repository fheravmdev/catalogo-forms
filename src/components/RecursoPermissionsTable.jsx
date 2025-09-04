import { IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'

function RecursoPermissionsTable({ recursos, handleRemoveRecurso, refresh }) {

    return (
        <Table sx={{mt:3, maxHeight: "300px"}}>
            <TableHead>
                <TableRow>
                    <TableCell>Recurso</TableCell>
                    <TableCell>Permisos</TableCell>
                    <TableCell>Acción</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {recursos.map(recurso => {
                    return (
                        <TableRow key={`${recurso.tipo}_${recurso.id}`}>
                            <TableCell>{recurso.nombre}</TableCell>
                            <TableCell>{recurso?.permisos?.join(", ")}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => {handleRemoveRecurso(recurso); refresh()}}>
                                    <DeleteIcon></DeleteIcon>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}

export default RecursoPermissionsTable