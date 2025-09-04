import instance from "../axios-instance";

export async function uploadFile(formData) {
    try {
        const response = await instance.post(
            "/upload/file/",
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        return { success: false, error: error?.response?.data?.error || error.message };
    }
}

export async function getMyFiles() {
    try {
        const response = await instance.get("/me/files", { withCredentials: true });

        return response.data;
    } catch (error) {
        return [];
    }
}

export async function downloadFile(idArchivo, nombreArchivo) {
    try {
        const response = await instance.get(`/download/${idArchivo}`, {
            responseType: "blob",
            withCredentials: true,
        });

        //Crea un link que direcciona hacia un archivo en la ventana; haciendo clic en él y eliminándolo una vez terrmina.
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", nombreArchivo || `archivo_${idArchivo}`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        return { success: true };
    } catch (error) {
        return { success: false, error: error?.response?.data?.error || error.message };
    }
}

export async function shareFile(permisosArray) {
    try {
        const res = await instance.post("/archivo_permiso/bulk", permisosArray, { withCredentials: true });
        return res.data;
    } catch (error) {
        return { success: false, error: error?.response?.data?.error || error.message };
    }
}

export async function deleteFile(idArchivo) {
    try {
        const res = await instance.delete(`/file/${idArchivo}`, {
            responseType: "blob",
            withCredentials: true,
        });

        return { success: true }
    } catch (error) {
        console.log(error)
        return { success: false, error: error?.response?.data?.error || error.message }
    }
}

export async function removeFilePermission(idUser, idArchivo) {
    try {
        console.log(idUser, idArchivo)
        const response = await instance.post(`/archivos/permisos`, { idUser: idUser, idArchivo: idArchivo }, { withCredentials: true });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error)
        return { success: false, error: error?.response?.data?.error || error.message };
    }
}

export async function editFile(formData, idArchivo) {
    try {
        console.log(formData, idArchivo)
        const response = await instance.post(
            `/file/edit/${idArchivo}`,
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
        return { success: false, error: error?.response?.data?.error || error.message };
    }
}