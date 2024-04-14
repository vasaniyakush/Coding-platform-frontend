import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import {
  Alert,
  Divider,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
// import PaymentForm from './PaymentForm';
// import Review from './Review';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Group Details"];

export default function AddClosedGroupModal(props) {
  const { setAddUserOpen, refresh } = props;
  const [activeStep, setActiveStep] = React.useState(0);
  const [personLimit, setPersonLimit] = React.useState(0);
  const [roundDuration, setRoundDuration] = React.useState(0);
  //   const { handleNext, setAddUserOpen, refresh } = props;
  //   const [personLimit, setpersonLimit] = React.useState(0);
  const handlePersonLimitChange = (e) => {
    setpersonLimit(parseInt(e.target.value));
  };
  const [payoutDuration, setpayoutDuration] = React.useState(0);
  const handlepayoutDurationChange = (e) => {
    setpayoutDuration(parseInt(e.target.value));
  };
  const [savingGoal, setsavingGoal] = React.useState(0);
  const handlesavingGoalChange = (e) => {
    setsavingGoal(parseInt(e.target.value));
  };

  const [name, setName] = React.useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [type, setType] = React.useState("public");
  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const [err, setErr] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setErr("");
  };

  return (
    <React.Fragment>
      <Container maxWidth="xl" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Create Closed Group
          </Typography>
          <Divider></Divider>
          {/* <React.Fragment> */}
          <Typography variant="h6" mb={0}>
            Name
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={8} sm={8}>
              <TextField
                required
                id="name"
                value={name}
                onChange={handleNameChange}
                name="name"
                placeholder="Closed group name . . ."
                // label="Group Name"
                fullWidth
                // autoComplete="given-name"
                variant="standard"
              />
            </Grid>

            {/* PERSON LIMIT */}

            <Grid item xs={8} sm={8}>
              <InputLabel variant="standard" htmlFor="select-person-limit">
                <Typography variant="h6" mb={0}>
                  Group Size
                </Typography>
              </InputLabel>
              <Select
                // labelId="demo-simple-select-label"
                id="select-person-limit"
                placeholder="Select a Group Size"
                value={personLimit}
                fullWidth={true}
                label="PersonLimit"
                onChange={handlePersonLimitChange}
              >
                {/* {personLimits.map((val) => (
                  <MenuItem key={val} value={val}>
                    {val === 0 ? "Select Group Size..." : val + " People"}
                  </MenuItem>
                ))} */}
              </Select>
            </Grid>

            <Grid item xs={8} sm={8}>
              <InputLabel variant="standard" htmlFor="select-person-limit">
                <Typography variant="h6" mb={0}>
                  Contribution Amount (per payout)
                </Typography>
              </InputLabel>
              <Select
                id="select-saving-goal"
                value={savingGoal}
                fullWidth={true}
                label="Saving Goal"
                onChange={handlesavingGoalChange}
              >
                {/* {savingGoals.map((val) => (
                  <MenuItem key={val} value={val}>
                    {val === 0 ? "Select Contribution Amount..." : "$" + val}
                  </MenuItem>
                ))} */}
              </Select>
            </Grid>
            <Grid item xs={8} sm={8}>
              <InputLabel variant="standard" htmlFor="select-person-limit">
                <Typography variant="h6" mb={0}>
                  Payout Duration (Days)
                </Typography>
              </InputLabel>
              <Select
                id="select-payout-durations"
                value={payoutDuration}
                fullWidth={true}
                label="Saving Goal"
                onChange={handlepayoutDurationChange}
              >
                {/* {payoutDurations.map((val) => (
                  <MenuItem key={val} value={val}>
                    {val === 0 ? "Select Payout Duration..." : val + " Days"}
                  </MenuItem>
                ))} */}
              </Select>
            </Grid>
            <Grid item xs={8} sm={8}>
              <InputLabel variant="standard" htmlFor="select-person-limit">
                <Typography variant="h6" mb={0}>
                  Type
                </Typography>
              </InputLabel>
              <Select
                id="select-payout-durations"
                value={type}
                fullWidth={true}
                label="Saving Goal"
                onChange={handleTypeChange}
              >
                {/* {payoutDurations.map((val) => ( */}
                <MenuItem key={"public"} value={"public"}>
                  {"Public"}
                </MenuItem>
                <MenuItem key={"private"} value={"private"}>
                  {"Private"}
                </MenuItem>
                {/* ))} */}
              </Select>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            onClick={() => {
              setAddUserOpen(false);
            }}
            sx={{ mt: 3, ml: 1 }}
          >
            Cancel
          </Button>
          <Button variant="contained" sx={{ mt: 3, ml: 1 }}>
            Submit
          </Button>
          {/* </FormControl> */}
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={err}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              variant="filled"
              sx={{ width: "100%" }}
            >
              {err}
            </Alert>
          </Snackbar>
          {/* </React.Fragment> */}
        </Paper>
        {/* <Copyright /> */}
      </Container>
    </React.Fragment>
  );
}
