import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import api from "@/api";

import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Button,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import Cookies from "js-cookie";

export default function EditQuestionModal(props) {
  const { setAddUserOpen } = props;
  const [personLimit, setpersonLimit] = React.useState(0);
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
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const [payoutDurations, setPayoutDurations] = React.useState([0]);
  const [personLimits, setPersonLimits] = React.useState([0]);
  const [savingGoals, setSavingGoals] = React.useState([0]);

  async function getAllOptions() {
    const token = Cookies.get("token");
    api.defaults.headers.Authorization = `Bearer ${token}`;
    try {
      let response = await api.get("closed-group/participants");
      // personLimits.push(response.data['participantList'])
      setPersonLimits([0, ...response.data["participantList"]]);
      response = await api.get("closed-group/contribution-amounts");
      // savingGoals.push(response.data['ContributionAmounts'])
      setSavingGoals([0, ...response.data["ContributionAmounts"]]);
      response = await api.get("closed-group/payout-durations");
      // payoutDurations.push(response.data['ContributionAmounts'])
      setPayoutDurations([0, ...response.data["PayoutDurations"]]);

      // console.log(response.data);
      // payoutDurations = response.data;
    } catch (error) {
      console.error("Error fetching closed groups:", error);
    } finally {
    }
  }

  const handleFormSubmit = async () => {
    if (name.trim() == "") {
      setErr(`Name cannot be Blank`);
      setName("");
      setOpen(true);
    } else if (personLimit == 0) {
      setErr(`Group size cannot be 0`);
      setOpen(true);
    } else if (savingGoal == 0) {
      setErr(`Contribution Amount cannot be 0`);
      setOpen(true);
    } else if (payoutDuration == 0) {
      setErr(`Payout Duration cannot be 0`);
      setOpen(true);
    } else {
      let data = JSON.stringify({
        name: name,
        personLimit: personLimit,
        roundDuration: payoutDuration,
        savingGoal: savingGoal,
        type: type,
      });
      try {
        await api.post("/closed-group", data);
        handleNext();
        refresh();
      } catch (error) {
        console.error("Error fetching closed groups:", error);
        setErr(
          error.message +
            " " +
            (error?.response?.data?.message
              ? error?.response?.data?.message
              : "")
        );
        setOpen(true);
      } finally {
      }
    }
  };

  React.useEffect(() => {
    // getAllOptions();
  }, []);
  return (
    <React.Fragment>
      <Typography variant="h6" mb={0}>
        Name
      </Typography>

      <Button
        variant="contained"
        onClick={() => {
          setAddUserOpen(false);
        }}
        sx={{ mt: 3, ml: 1 }}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        onClick={handleFormSubmit}
        sx={{ mt: 3, ml: 1 }}
      >
        Submit
      </Button>
      {/* </FormControl> */}
    </React.Fragment>
  );
}
