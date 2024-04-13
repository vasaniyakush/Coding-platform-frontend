// import { Title } from "@mui/icons-material";
import { Chip, Divider, Grid, IconButton, Typography } from "@mui/material";
import * as React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
export default function TestDetails(props) {
  const { details } = props;

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
              size="medium"
              label="Upcoming"
            />
          ) : details.status == "running" ? (
            <Chip variant="filled" size="large" color="error" label="Running" />
          ) : (
            <Chip
              variant="filled"
              size="medium"
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
          <Typography component="p" variant="h6">
            {/* {details.FrontUser.Username} | {details.FrontUser.Phone} <Divider />{" "} */}
            {details.testDuration} minutes
          </Typography>
        </Grid>
        <Grid item xs={3} md={3}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            No. of Questions:
          </Typography>
          <Typography component="p" variant="h6">
            {details.numOfQuestion}
          </Typography>
        </Grid>
        <Grid item xs={2} md={2}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Total Students
          </Typography>
          <Typography component="p" variant="h5">
            {details.personLimit}
          </Typography>
        </Grid>
        {/* <Grid item xs={3.5} md={3.5}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Savings Goal
          </Typography>
          <Typography component="p" variant="h6">
            ${details.savingGoal * 3} (${details.savingGoal} / payout)
          </Typography>
        </Grid> */}
      </Grid>
    </>
  );
}
