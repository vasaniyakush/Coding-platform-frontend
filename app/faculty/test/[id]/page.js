"use client";
import * as React from "react";
// import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import TestDetails from "@/components/TestDetails";

// import InvitesList from "@/components/InvitesList";
// import MemberTable from "@/components/MemberTable";
import { Skeleton } from "@mui/material";
import api from "@/api";
import Cookies from "js-cookie";
// import CyclesTable from "@/components/CyclesTable";
import { useAdminAuth } from "@/contexts/faculty-auth";
// import QuestionsTable from "@/components/facultyQuestions";
// import { mainListItems, secondaryListItems } from './listItems';
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';

export default function Dashboard({ params }) {
  const [detailsLoading, setDetailsLoading] = React.useState(true);
  const [invitesLoading, setInvitesLoading] = React.useState(true);
  const [usersLoading, setUsersLoading] = React.useState(true);

  const [details, setDetails] = React.useState({});
  const [users, setUsers] = React.useState({});
  const [invites, setInvites] = React.useState({});
  const [refresh, setRefresh] = React.useState(false);
  const toggleRefresh = () => setRefresh(!refresh);
  const [ownGroup, setOwnGroup] = React.useState(false);
  const { login, loading, user } = useAdminAuth();

  React.useEffect(() => {
    async function getTest() {
      const token = Cookies.get("token");
      api.defaults.headers.Authorization = `Bearer ${token}`;
      try {
        const response = await api.get(`test/${params.id}`);
        console.log(response.data);
        setDetails(response.data.data);
        // setOwnGroup(response.data.closedGroup.createdBy == user.data.uid);
        setDetailsLoading(false);
      } catch (error) {
        console.error("Error fetching closed groups:", error);
      } finally {
      }

      // try {

      //   // setOwnGroup(response.data.closedGroup.createdBy == user.data.uid)
      //   // console.log(response.data.closedGroup.createdBy,user.data.uid, user,response.data.closedGroup.createdBy == user.data.uid)

      // } catch (error) {
      //   console.error("Error fetching closed groups:", error);
      // } finally {
      //   setInvitesLoading(false)
      // }
    }
    setDetailsLoading(true);
    // setInvitesLoading(true);
    // setUsersLoading(true);
    getTest();
  }, [refresh]);

  return (
    <Box sx={{ display: "flex", ml: 0 }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          ml: 0,
        }}
      >
        <Container maxWidth="false" sx={{ mt: 1, mb: 1, ml: 0 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              {detailsLoading ? (
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  height={240}
                  sx={{ mt: 0 }}
                ></Skeleton>
              ) : (
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "row",
                    height: 240,
                  }}
                >
                  <TestDetails
                    details={details}
                    // toggleRefresh={toggleRefresh}
                  />
                </Paper>
              )}
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  Questions
                </Typography>
                {/* <QuestionsTable questions={details.Question} /> */}
              </Paper>
            </Grid>
            {/* <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <CyclesTable />
              </Paper>
            </Grid> */}
          </Grid>
          {/* <Copyright sx={{ pt: 4 }} /> */}
        </Container>
      </Box>
    </Box>
    // </ThemeProvider>
  );
}
