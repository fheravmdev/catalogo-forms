import useAuth from "../hooks/useAuth"
import { Card, CardActionArea, CardContent, CardMedia, Tooltip, Typography } from "@mui/material"

function TrabajoEnCurso() {
    const { auth } = useAuth()
    return (
        <Tooltip
            title="Esta no es una imagen real del programador"
            placement="top"
        >
            <Card>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height={"140"}
                        sx={{ objectFit: 'contain' }}
                        src={`${import.meta.env.BASE_URL}/typing-cat.gif`}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Hola, {auth.username}.
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Se está trabajando en esta página todavía...
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Tooltip>
    )
}

export default TrabajoEnCurso