import { useEffect, useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Tooltip, Typography, Button, IconButton
} from "@mui/material";
import { downloadFile, getMyFiles } from "../services/files";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import ShareFileModal from "./ShareFileModal";

const columns = [
    { field: "idArchivo", headerName: "ID", description: "ID del archivo" },
    { field: "nombre", headerName: "Nombre", description: "Nombre del archivo" },
    { field: "tipo_archivo", headerName: "Tipo", description: "Tipo de archivo" },
    { field: "fecha_subida", headerName: "Fecha", description: "Fecha de subida" },
    { field: "acciones", headerName: "Acciones", description: "Acciones disponibles" },
];

function FilesTable() {
    const [files, setFiles] = useState([]);
    const [shareFile, setShareFile] = useState(null);

    useEffect(() => {
        getMyFiles().then(setFiles);
    }, []);

    const handleDownload = async (file) => {
        const result = await downloadFile(file.idArchivo, file.nombre);
        if (!result.success) {
            alert("No se pudo descargar el archivo: " + result.error);
        }
    };

    const handleDelete = (file) => {
        // Implementar
    };

    const handleShare = (file) => {
        setShareFile(file);
    };

    const handleCloseShare = () => {
        setShareFile(null);
    };

    return (
        <>
            <TableContainer component={Paper} sx={{ maxHeight: "calc(100vh - 125px)" }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map(col => (
                                <Tooltip key={col.field} title={col.description} placement="top">
                                    <TableCell
                                        sx={{
                                            bgcolor: 'primary.main',
                                            color: 'primary.contrastText',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {col.headerName}
                                    </TableCell>
                                </Tooltip>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {files.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length}>
                                    <Typography align="center" color="text.secondary">
                                        No hay archivos para mostrar.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            files.map((file) => (
                                <TableRow key={file.idArchivo} hover>
                                    <TableCell>{file.idArchivo}</TableCell>
                                    <TableCell>{file.nombre}</TableCell>
                                    <TableCell>{file.tipo_archivo}</TableCell>
                                    <TableCell>{file.fecha_subida}</TableCell>
                                    <TableCell>
                                        <Tooltip title="Descargar">
                                            <IconButton onClick={() => handleDownload(file)}>
                                                <DownloadIcon />
                                            </IconButton>
                                        </Tooltip>
                                        {file.permisos.includes("compartir") && (
                                            <Tooltip title="Compartir">
                                                <IconButton onClick={() => handleShare(file)}>
                                                    <ShareIcon />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                        {file.permisos.includes("eliminar") && (
                                            <Tooltip title="Eliminar">
                                                <IconButton onClick={() => handleDelete(file)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {shareFile && (
                <ShareFileModal
                    open={!!shareFile}
                    onClose={handleCloseShare}
                    file={shareFile}
                />
            )}
        </>
    );
}

export default FilesTable;