// import { Title } from "@mui/icons-material";
import {
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import * as React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SendIcon from "@mui/icons-material/Send";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import api from "@/api";
export default function TestDetails(props) {
  const { details, toggleRefresh } = props;
  const handleStartTest = async () => {
    let data = JSON.stringify({
      testName: details.name,
      testDuration: details.testDuration,
      numOfQuestion: details.numOfQuestion,
      group: details.group,
      status: "running",
    });
    await api.put(`/test/${details.id}`, data);

    // api.post();

    toggleRefresh();
  };
  const handleEndTest = async () => {
    let data = JSON.stringify({
      testName: details.name,
      testDuration: details.testDuration,
      numOfQuestion: details.numOfQuestion,
      group: details.group,
      status: "completed",
    });
    await api.put(`/test/${details.id}`, data);

    // api.post();

    toggleRefresh();
  };

  return (
    <>
      <Grid container overflow={"auto"} spacing={3}>
        <Grid item xs={8} md={8}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Name
          </Typography>
          <Typography component="p" variant="h4">
            {details.testName}
          </Typography>
          <Divider></Divider>
        </Grid>
        <Grid item xs={2} md={2}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Group
          </Typography>
          <Typography component="p" variant="h5">
            {/* {details.FrontUser.Username} | {details.FrontUser.Phone} <Divider />{" "} */}
            {details.group}
          </Typography>
        </Grid>
        <Grid item xs={2} md={2}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Status:
          </Typography>
          {/* <Typography component="p" variant="h5"> */}
          {details.status == "upcoming" ? (
            <Chip
              variant="filled"
              color="warning"
              size="large"
              label="Upcoming"
            />
          ) : details.status == "running" ? (
            <Chip variant="filled" size="large" color="error" label="Running" />
          ) : (
            <Chip
              variant="filled"
              size="large"
              color="success"
              label="Completed"
            />
          )}
          {/* </Typography> */}
        </Grid>
        <Grid item xs={3} md={3}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Test Duration
          </Typography>
          <Typography component="p" variant="h5">
            {/* {details.FrontUser.Username} | {details.FrontUser.Phone} <Divider />{" "} */}
            {details.testDuration} minutes
          </Typography>
        </Grid>
        <Grid item xs={3} md={3}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            No. of Questions:
          </Typography>
          <Typography component="p" variant="h5">
            {details.Question.length}
          </Typography>
        </Grid>
        <Grid item xs={2} md={2}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Total Students
          </Typography>
          <Typography component="p" variant="h5">
            {details.User.length}
          </Typography>
        </Grid>
        <Grid item xs={4} md={4}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Actions:
          </Typography>
          {details.status == "upcoming" && (
            <Button
              variant="contained"
              endIcon={<AddCircleIcon />}
              size="medium"
            >
              Add Question
            </Button>
          )}
          {/* </Grid>
        <Grid item xs={2} md={2}> */}
          {details.status == "upcoming" ? (
            <Button
              variant="contained"
              color="warning"
              endIcon={<SendIcon />}
              size="medium"
              sx={{ ml: 3 }}
              onClick={handleStartTest}
            >
              Start Test
            </Button>
          ) : details.status == "running" ? (
            <Button
              variant="contained"
              color="error"
              endIcon={<SendIcon />}
              size="medium"
              onClick={handleEndTest}
              // sx={{ ml: 3 }}
            >
              Finish Test
            </Button>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </>
  );
}
