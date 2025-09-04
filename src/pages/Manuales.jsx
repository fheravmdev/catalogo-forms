import { useEffect, useState } from 'react';
import { Grid, ThemeProvider, Typography, Stack, CircularProgress } from '@mui/material';
import AreaManualsGroup from './../components/AreaManualsGroup.jsx';
import { getMyFiles } from '../services/files.js';
import useAuth from '../hooks/useAuth';

const areaColors = {
    "CONTRALORIA": "#673ab7",
    "GESTIÓN HUMANA": "#4799ce",
    "INFORMÁTICA": "#286357",
    "CONTABILIDAD": "#b77b2b"
};

function Manuales({ Theme }) {
    const [manuales, setManuales] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadManuales = async () => {
            setLoading(true);
            try {
                const result = await getMyFiles();
                const manuals = result.success? result.files.filter(f => f.tipo_archivo && f.tipo_archivo.toLowerCase() === "manual") :  [];
                setManuales(manuals);
            } catch (error) {
                setManuales([]);
            } finally {
                setLoading(false);
            }
        };
        loadManuales();
    }, []);

    const uniqueAreas = [...new Set(manuales.map(m => m?.area).filter(Boolean))].sort(
        (a, b) => a.localeCompare(b)
    );

    if (loading) return (<CircularProgress sx={{ position: 'absolute', top: "50%", left: "50%" }} />);
    return (
        <ThemeProvider theme={Theme}>
            <Grid container spacing={4} sx={{ padding: 1 }}>
                <Stack direction="column" spacing={2} width="100%">
                    <Grid container spacing={2}>
                        {uniqueAreas.map(area => (
                            <Grid key={area} size={{sm:12, md: 4}}>
                                <AreaManualsGroup
                                    area={area}
                                    manuals={manuales.filter(m => m?.area === area)}
                                    colors={{ top: areaColors[area] || "#888" }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Stack>
            </Grid>
        </ThemeProvider>
    );
}

export default Manuales;