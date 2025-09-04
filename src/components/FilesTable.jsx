import { useEffect, useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Tooltip, Typography, IconButton, Backdrop, CircularProgress,
    Dialog,
    DialogTitle
} from "@mui/material";
import { deleteFile, downloadFile, editFile, getMyFiles } from "../services/files";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import ShareFileModal from "./ShareFileModal";
import useAuth from "../hooks/useAuth";
import EditIcon from '@mui/icons-material/Edit';
import FileUpload from "./FileUpload";

function FilesTable({ parentRefresh }) {
    const [files, setFiles] = useState([]);

    //estado para abrir un modal que permita compartir los archivos o modificarlos
    const [shareFile, setShareFile] = useState(null);
    const [editFile, setEditFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //atado al parentRefresh, para actualizarse con los cambios provenientes de FileUpload.
    const [refresh, setRefresh] = useState(0);

    const { auth } = useAuth() //mousequeherramienta misteriosa que nos ayudará en futuras actualizaciones


    //Cargar los archivos en la tabla.
    useEffect(() => {
        const loadFiles = async () => {
            try {
                setLoading(true);
                const result = await getMyFiles()
                console.log(result.files)
                if (result.success) {
                    setFiles(result.files);
                }
                else {

                }

            } catch (error) {
                console.log(error)
                setError(error)
                setLoading(false)
            } finally {
                setError(null)
                setLoading(false)
            }
        }
        loadFiles();
    }, [refresh, parentRefresh]); // El dependency array verifica si algo ha cambiado en este componente (refresh), o en MeFilesTab (parentRefresh)

    const handleDownload = async (file) => {
        try {
            setLoading(true)
            const result = await downloadFile(file.idArchivo, file.nombre);
            if (!result.success) {
                alert("No se pudo descargar el archivo: " + result.error);
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        } finally {
            setLoading(false)
        }

    };

    const handleEdit = async (file) => {
        setEditFile(file);
    }

    const handleDelete = async (file) => {
        try {
            setLoading(true);
            const result = await deleteFile(file.idArchivo)
            if (result.success) {
                alert("Archivo eliminado exitosamente!")
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
            alert(`Error: ${error}`)
        }
        finally {
            setLoading(false)
            setRefresh(refresh + 1);
        }
    };

    //si file no es null, se abre el modal.
    const handleShare = (file) => {
        setShareFile(file);
    };

    const handleCloseShare = () => {
        setShareFile(null);
    };


    const columns = [
        { field: "idArchivo", headerName: "ID", description: "ID del archivo" },
        { field: "nombre", headerName: "Nombre", description: "Nombre del archivo" },
        { field: "tipo_archivo", headerName: "Tipo", description: "Tipo de archivo" },
        { field: "fecha_subida", headerName: "Fecha", description: "Fecha de subida" },
        { field: "acciones", headerName: "Acciones", description: "Acciones disponibles" },
    ];

    return (
        <>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
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
                            files?.map((file) => (
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
                                        {file.permisos.includes("editar") && (
                                            <Tooltip title="Editar">
                                                <IconButton onClick={() => handleEdit(file)}>
                                                    <EditIcon></EditIcon>
                                                </IconButton>
                                            </Tooltip>
                                        )}
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
            <Dialog
                open={!!editFile}
                onClose={() => { setEditFile(null) }}
            >
                <DialogTitle>EDITAR ARCHIVO: {editFile?.nombre}</DialogTitle>
                <FileUpload handleFilesChanged={() => { setRefresh(refresh + 1); setEditFile(null); }} edit={editFile}></FileUpload>

            </Dialog>
        </>
    );
}

export default FilesTable;


