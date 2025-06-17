import { useEffect, useState } from 'react'
import { Grid, ThemeProvider, Typography, Button, Stack, CircularProgress } from '@mui/material'
import AreaFormsGroup from './../components/AreaFormsGroup.jsx';
import { fetchFormularios } from '../services/formularios.js'
import useAuth from '../hooks/useAuth';

const areaColors = {
    "CONTRALORIA": "#673ab7",
    "GESTIÓN HUMANA": "#4799ce",
    "INFORMÁTICA": "#286357",
    "CONTABILIDAD": "#b77b2b"
};

function Formularios({ Theme, user }) {
    const [formularios, setFormularios] = useState([]);
    const { setAuth } = useAuth();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadFormularios = async () => {
            const response = await fetchFormularios();

            let allForms = [];
            if (Array.isArray(response)) {
                allForms = response;
            } else {

                allForms = Object.values(response).flat();
            }

            setFormularios(allForms);
        };
        try {
            setLoading(true)
            loadFormularios();
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }, []);


    const uniqueAreas = [...new Set(formularios.map(form => form.area).filter(Boolean))];

    if (loading) return (<CircularProgress sx={{ position: 'absolute', top: "50%", left: "50%" }}></CircularProgress>)
    return (
        <ThemeProvider theme={Theme}>
            <Grid container spacing={4} sx={{ padding: 1 }}>
                <Stack direction="column" spacing={2} width="100%">
                    <Grid container spacing={2}>
                        {uniqueAreas.map(area => (
                            <Grid key={area} size={{ xs: 12, md: 4 }}>
                                <AreaFormsGroup
                                    area={area}
                                    forms={formularios.filter(form => form.area === area)}
                                    colors={{ top: areaColors[area] || "#888" }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Stack>
            </Grid>
        </ThemeProvider>
    )
}

export default Formularios