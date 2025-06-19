import { useState } from "react";
import { Box, Button, TextField, MenuItem, Typography, Paper } from "@mui/material";
import { createUser } from "../services/users";

const ROLES = ["ADMIN", "CONTRALORIA", "GESTIÓN HUMANA", "INFORMÁTICA", "CONTABILIDAD"];

function CreateUserForm({ onCreated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!username || !password || roles.length === 0) {
      setError("Completa todos los campos.");
      return;
    }
    const res = await createUser({ username, password, roles });
    if (res?.success) {
      setSuccess("Usuario creado.");
      setUsername(""); setPassword(""); setRoles([]);
      onCreated?.();
    } else {
      setError(res?.error || "Error al crear usuario.");
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
          value={roles}
          onChange={e => setRoles(typeof e.target.value === "string" ? e.target.value.split(",") : e.target.value)}
          sx={{ minWidth: 200 }}
        >
          {ROLES.map(role => <MenuItem key={role} value={role}>{role}</MenuItem>)}
        </TextField>
        <Button type="submit" variant="contained">Crear</Button>
      </Box>
      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="primary">{success}</Typography>}
    </Paper>
  );
}

export default CreateUserForm;