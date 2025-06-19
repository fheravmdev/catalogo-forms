import { useState } from "react";
import { Box } from "@mui/material";
import FormUpload from "../components/FormUpload";
import FormsTable from "../components/FormsTable";
import FormEditModal from "../components/FormEditModal";
import ShareFormModal from "../components/ShareFormModal";

function FormsAdminPage() {
    const [editForm, setEditForm] = useState(null);
    const [shareForm, setShareForm] = useState(null);
    const [refreshSignal, setRefreshSignal] = useState(0);

    const handleUploaded = () => setRefreshSignal(s => s + 1);
    const handleEdit = (form) => setEditForm(form);
    const handleShare = (form) => setShareForm(form);
    const handleCloseEdit = () => { setEditForm(null); setRefreshSignal(s => s + 1); };
    const handleCloseShare = () => { setShareForm(null); setRefreshSignal(s => s + 1) }

    return (
        <Box sx={{ p: 2 }}>
            <FormUpload onUpload={handleUploaded} />
            <FormsTable onEdit={handleEdit} onShare={handleShare} refreshSignal={refreshSignal} />
            {editForm && (
                <FormEditModal open={!!editForm} form={editForm} onClose={handleCloseEdit} />
            )}
            {shareForm && (
                <ShareFormModal open={!!shareForm} form={shareForm} onClose={handleCloseShare} ></ShareFormModal>
            )}

        </Box>
    );
}

export default FormsAdminPage;