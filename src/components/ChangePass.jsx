import { Avatar, Backdrop, Button, CircularProgress, Grid, Paper, Stack, TextField, Typography } from '@mui/material'
import TrabajoEnCurso from './TrabajoEnCurso.jsx'
import { useEffect, useState } from 'react'
import { red } from '@mui/material/colors'
import { modifyPassword } from '../services/users.js'
import PasswordInput from './PasswordInput.jsx'

function ChangePass({ user }) {
    const [loading, setLoading] = useState(false)
    const [newPass, setNewPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [oldPass, setOldPass] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [formError, setFormError] = useState(null)
    const [showPass, setShowPass] = useState(false)


    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (newPass == '' || confirmPass == '' || oldPass == '') {
            setFormError('Llenar todos los campos!')
            return;
        }
        if (confirmPass != newPass) {
            setFormError('Las contraseñas (nuevas) no coinciden')
            return;
        }
        try {
            setLoading(true);
            const res = await modifyPassword(oldPass, newPass)
            console.log(res)
            if (res.success) {
                alert('Contraseña modificada correctamente!')
                setFormError(null)
                setShowForm(false)
                setOldPass('');
                setNewPass('');
                setConfirmPass('');
            }
            if (res.status === 400) {
                setFormError('La contraseña antigua no coincide')
                return;
            }
            if (res.error) {
                setFormError(res.error)
            }
        } catch (error) {
            setLoading(false);
            console.log(error)
            setFormError(error);
        }
        finally {
            setLoading(false)
        }
    }

    return (

        <Grid container>
            <Backdrop
                open={loading}
                sx={{ zIndex: 1 }}
            >
                <CircularProgress></CircularProgress>
            </Backdrop>
            <Grid
                size={{ sm: 12, md: 4 }}
                spacing={2}
                padding={1}
                width={1}
            >

                <Stack
                    spacing={2}
                >
                    <Paper elevation={2} sx={{ padding: "10px" }}>

                        <Typography typography={"h6"} textAlign={'center'}>
                            Usuario: {user.username}
                        </Typography>

                    </Paper>
                    <Paper elevation={2} sx={{ padding: "10px" }}>
                        <Stack spacing={2}>
                            <Button
                                fullWidth
                                variant='contained'
                                onClick={() => {
                                    setShowForm(!showForm)
                                    setOldPass('');
                                    setNewPass('');
                                    setConfirmPass('');
                                }}
                                color='primary'
                            >
                                {!showForm ? "Cambiar mi contraseña" : "Cancelar"}
                            </Button>
                            {
                                showForm && (
                                    <>
                                        {/* Implementar luego PasswordInputs */}
                                        <Typography typography={"body"}>
                                            Ingrese su contraseña actual, y luego confirme una nueva
                                        </Typography>

                                        <PasswordInput
                                            value={oldPass}
                                            showPass={showPass}
                                            onClickHandler={() => setShowPass(show => !show)}
                                            onChangeHandler={e => { setOldPass(e.target.value); setFormError(null); }}
                                            label="Contraseña actual"
                                        />

                                        <PasswordInput
                                            value={newPass}
                                            showPass={showPass}
                                            onClickHandler={() => setShowPass(show => !show)}
                                            onChangeHandler={e => { setNewPass(e.target.value); setFormError(null); }}
                                            label="Nueva contraseña"
                                        />
                                        <PasswordInput
                                            value={confirmPass}
                                            showPass={showPass}
                                            onClickHandler={() => setShowPass(show => !show)}
                                            onChangeHandler={(e) => { setConfirmPass(e.target.value); setFormError(null) }}
                                            label="Confirmar nueva contraseña"
                                        />

                                        {formError && (
                                            <Typography
                                                typography="subtitle" gutterBottom
                                                sx={{ color: 'red', textAlign: 'center' }}
                                            >
                                                {formError}
                                            </Typography>
                                        )}
                                        <Button
                                            type='submit'
                                            onClick={handleChangePassword}
                                        >
                                            Cambiar contraseña
                                        </Button>

                                    </>
                                )
                            }
                        </Stack>
                    </Paper>

                </Stack>
            </Grid >
        </Grid >
    )
}

export default ChangePass

// < Grid xs = { 12} md = { 4} sx = {{ position: "absolute", top: "calc(50% - 100px)", left: "calc(50% - 180px)" }}>
//     <TrabajoEnCurso></TrabajoEnCurso>
//         </Grid >