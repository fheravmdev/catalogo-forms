import { useState } from "react";
import { Box, Button, TextField, MenuItem, Typography, Paper, CircularProgress } from "@mui/material";
import { createUser } from "../services/users";

const ROLES = ["ADMIN", "CONTRALORIA", "GESTIÓN HUMANA", "INFORMÁTICA", "CONTABILIDAD",
  "LEGAL", "GERENTE COMERCIAL", "SUPERVISORA DETALLE", "RESPONSABLE MAYOREO", "COMPRAS", "MANTENIMIENTO", "IMPORTACIONES / EXPORTACIONES", "MERCADEO", "DISTRIBUCIÓN", "PRODUCCIÓN"];

function CreateUserForm({ onCreated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState(ROLES[0]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    try {
      setLoading(true)
      e.preventDefault();
      console.log(selectedRole)
      setError(""); setSuccess("");
      if (!username || !password || !selectedRole) {
        setError("Completa todos los campos.");
        return;
      }
      const res = await createUser({ username, password, rol: selectedRole });
      if (res?.success) {
        setSuccess("Usuario creado.");
        setUsername(""); setPassword(""); setSelectedRole(ROLES[0]);
        onCreated?.();
      } else {
        setError(res?.error || "Error al crear usuario.");
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>Crear usuario</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <TextField label="Usuario" value={username} onChange={e => setUsername(e.target.value)} />
        <TextField label="Contraseña" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <TextField
          select
          label="Roles"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          sx={{ minWidth: 200 }}
          defaultValue={ROLES[0]}
        >
          {ROLES.map(role => <MenuItem key={role} value={role}>{role}</MenuItem>)}
        </TextField>
        <Button type="submit" variant="contained">Crear</Button>
        {loading && <CircularProgress></CircularProgress>}
      </Box>
      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="primary">{success}</Typography>}
    </Paper>
  );
}

export default CreateUserForm;

