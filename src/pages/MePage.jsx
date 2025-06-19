import { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import MeFilesTab from "../components/MeFilesTab";

function MePage() {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => setTab(newValue);

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Tabs value={tab} onChange={handleChange} centered>
        <Tab label="Mis archivos" />
      </Tabs>
      <Box sx={{ mt: 0 }}>
        {tab === 0 && <MeFilesTab />}
      </Box>
    </Box>
  );
}

export default MePage;