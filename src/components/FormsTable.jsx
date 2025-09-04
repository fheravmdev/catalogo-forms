import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import { getAllForms } from "../services/formularios";

function FormsTable({ onEdit, onShare, refreshSignal }) {
    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(false);

    const refresh = async () => {
        setLoading(true);
        setForms(await getAllForms());
        setLoading(false);
    };

    useEffect(() => { refresh(); }, [refreshSignal]);

    return (
        <>
            <TableContainer component={Paper} sx={{maxHeight: "450px"}}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Área</TableCell>
                            <TableCell>URL</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {forms.map(form => (
                            <TableRow key={form.idFormulario}>
                                <TableCell>{form.nombre}</TableCell>
                                <TableCell>{form.area}</TableCell>
                                <TableCell>
                                    <a href={form.res_url} target="_blank" rel="noopener noreferrer">Abrir</a>
                                </TableCell>
                                <TableCell>
                                    <Tooltip title="Editar">
                                        <IconButton onClick={() => onEdit && onEdit(form)}><EditIcon /></IconButton>
                                    </Tooltip>
                                    <Tooltip title="Compartir">
                                        <IconButton onClick={() => onShare && onShare(form)}><ShareIcon /></IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default FormsTable;
