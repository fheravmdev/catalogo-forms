import { TextField, InputAdornment, IconButton } from "@mui/material"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


function PasswordInput({ value, label = "Contraseña", showPass, onClickHandler, onChangeHandler }) {
    return (
        <TextField
            value={value}
            fullWidth
            label={label}
            type={showPass ? 'text' : "password"}
            variant="outlined"
            onChange={onChangeHandler}
            autoComplete="off"
            slotProps={{
                input: {
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton
                                onClick={onClickHandler}
                                aria-label={
                                    showPass ? 'hide the password' : 'display the password'
                                }
                                edge="end"
                            >
                                {showPass ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )

                }
            }}
        />
    )
}

export default PasswordInput