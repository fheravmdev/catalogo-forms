import { useRef, useEffect, useState } from 'react'
import { Grid, ThemeProvider, Typography, CircularProgress, Paper } from '@mui/material'
import { TextField, Button, Box } from '@mui/material';
import login from '../services/login';
import useAuth from '../hooks/useAuth';

function Login({ Theme }) {
    const { setAuth } = useAuth();

    const usernameRef = useRef();
    const errorRef = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        usernameRef.current.focus();
    }, [])

    useEffect(() => {
        setError(null);
    }, [username, password])

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const user = { username, password };
            const result = await login(user);

            if (result.success) {
                setAuth({
                    username: result.user.username,
                    roles: result.user.roles,
                    isAuthenticated: true
                });
            } else {
                setAuth({});
                setError(result.message || "Credenciales inválidas");
            }
        } catch (err) {
            setAuth({});
            setError("Ocurrió un error al intentar iniciar sesión");
            setLoading(false)

        } finally {
            setLoading(false)
        }
    }
    if (loading) return (<CircularProgress sx={{ position: 'absolute', top: "50%", left: "50%" }}></CircularProgress>)
    return (
        <ThemeProvider theme={Theme}>
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ height: 'calc(100vh - 80px)' }}
            >
                <Grid >
                    <Paper elevation={1} sx={{padding: 4}}>

                        <Typography variant="h5" align="center" marginBottom={5}>
                            Iniciar Sesión
                        </Typography>
                        <Box component="form" onSubmit={handleLogin}>

                            <Grid container direction="column" spacing={2}>
                                <Grid >
                                    <TextField
                                        fullWidth
                                        label="Usuario"
                                        variant="outlined"
                                        onChange={(e) => setUsername(e.target.value)}
                                        inputRef={usernameRef}
                                    />
                                </Grid>
                                <Grid >
                                    <TextField
                                        fullWidth
                                        label="Contraseña"
                                        type="password"
                                        variant="outlined"
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete='off'
                                    />
                                </Grid>
                                <Grid >
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        sx={{ backgroundColor: '#673ab7', fontWeight: 'bold' }}
                                        type="submit"
                                    >
                                        Entrar
                                    </Button>
                                </Grid>
                            </Grid>
                            {error && <p ref={errorRef} style={{ color: 'red' }}>{error}</p>}

                        </Box>
                    </Paper>

                </Grid>
            </Grid>
        </ThemeProvider >
    );
}

export default Login;