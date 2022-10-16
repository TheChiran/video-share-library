// material-ui

import { Button, Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import videoshare from "apis/videoshare";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const DashboardDefault = () => {
  const navigate = useNavigate();

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="warning">
            Please provide url from youtube embeded code
          </Alert>
        </Stack>
        <TextField
          id="outlined-basic"
          label="Youtube Url"
          variant="outlined"
          type="url"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Button>Sumbit</Button>
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
