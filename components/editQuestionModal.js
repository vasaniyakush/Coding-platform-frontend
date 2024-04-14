import React from "react";
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
  Checkbox,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import AceEditor from "react-ace";
import { decodeFromBase64, encodeToBase64 } from "@/utils";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-github";

function LeftPanel(data) {
  return (
    <Box sx={{ width: "50%", padding: "16px", overflowY: "scroll" }}>
      <Typography variant="h6" mb={2}>
        HTML Code Editor
      </Typography>
      <AceEditor
        mode="html"
        theme="github"
        width="100%"
        height="80vh"
        value={decodeFromBase64(data?.data)}
      />
    </Box>
  );
}

function TestCaseCard({ testCase, onSave }) {
  const [input, setInput] = React.useState(testCase.input);
  const [output, setOutput] = React.useState(testCase.output);
  const [hidden, setHidden] = React.useState(testCase.hidden);

  const handleSave = () => {
    onSave({
      ...testCase,
      input,
      output,
      hidden,
    });
  };

  return (
    <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h6">Test Case</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Input"
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Output"
            fullWidth
            value={output}
            onChange={(e) => setOutput(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={hidden}
                onChange={(e) => setHidden(e.target.checked)}
              />
            }
            label="Hidden"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}


function RightPanel(data) {
  return (
    <Box sx={{ width: "50%", padding: "16px", overflowY: "scroll" }}>
      <Typography variant="h6" mb={2}>
        Test Cases
      </Typography>
      {data?.data?.map((testCase) => (
        <TestCaseCard key={testCase.id} testCase={testCase} onSave={console.log} />
      ))}
    </Box>
  );
}

export default function AddClosedGroupModal(props) {
  const { setAddUserOpen, currentdata } = props;
  // console.log(setAddUserOpen, currentdata)
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
            Edit Question Data
          </Typography>
          <Divider />
          <Grid container spacing={0}>
            <LeftPanel data={currentdata.statement} />
            <RightPanel data={currentdata?.TestCase} />
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
        </Paper>
      </Container>
    </React.Fragment>
  );
}
