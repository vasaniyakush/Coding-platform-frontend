"use client";
import Image from "next/image";
// import styles from "./page.module.css";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import CodeIcon from "@mui/icons-material/Code";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";

import {
  AppBar,
  Box,
  Button,
  Chip,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  LinearProgress,
  Menu,
  MenuItem,
  Paper,
  Select,
  TextField,
  TextareaAutosize,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
// import { green, purple } from "@mui/material/colors";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
import AceEditor from "react-ace";
import axios from "axios";
import "brace/mode/c_cpp";
import "brace/mode/java";
import "brace/mode/python";
import "brace/theme/monokai";
import "brace/theme/chrome";

import { useEffect, useState } from "react";
import useLocalStorage from "@/custom-hooks/useLocalStorage";
// import Problem from "@/components/problem";
import {
  IP,
  defaultCode,
  lang_extn,
  langs,
  langs_ids,
  statuses,
} from "@/constants";
import { decodeFromBase64 } from "@/utils";
import Cookies from "js-cookie";
import api from "@/api";
// import { BorderColor } from "@mui/icons-material";

export default function Home({ params }) {
  const [lang, setLang] = useState(langs[0]);
  const [selectVal, setSelectVal] = useState(1);
  const [cCode, setCCode] = useLocalStorage(
    `C_${params.id}_${params.questionId}`,
    defaultCode.C
  );
  const [cppCode, setCPPCode] = useLocalStorage(
    `CPP_${params.id}_${params.questionId}`,
    defaultCode.CPP
  );
  const [javaCode, setJavaCode] = useLocalStorage(
    `JAVA_${params.id}_${params.questionId}`,
    defaultCode.JAVA
  );
  const [pyCode, setPyCode] = useLocalStorage(
    `PYTHON_${params.id}_${params.questionId}`,
    defaultCode.PYTHON
  );
  const [question, setQuestion] = useLocalStorage(
    `question_${params.id}_${params.questionId}`,
    ""
  );
  const [code, setCode] = useLocalStorage(
    `CODE_${params.id}_${params.questionId}`,
    cppCode
  );
  const availableCodes = [cCode, cppCode, javaCode, pyCode];
  const availableSetCodes = [setCCode, setCPPCode, setJavaCode, setPyCode];
  const [fontSize, setFontSize] = useLocalStorage("fontsize", 20);
  const [alignment, setAlignment] = useState("testcase");
  const [customTestcase, setCustomTestcase] = useLocalStorage(
    `testcase_${params.id}_${params.questionId}`,
    "1\n0"
  );
  const [sampleTestcase, setSampleTestcase] = useLocalStorage(
    `sample_testcase_${params.id}_${params.questionId}`,
    []
  );
  const [result, setResult] = useLocalStorage(
    `result_${params.id}_${params.questionId}`,
    "Run or Submit to see output"
  );
  const [passed, setPassed] = useState("default");
  const [testcaseStatus, setTestcaseStatus] = useState("status");
  const [buttonStatus, setButtonStatus] = useState(false);

  //form states
  const [loading, setLoading] = useState(false);
  const [formName, setFormName] = useState("");
  const [rollNum, setRollNum] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleCheck = async () => {
    try {
      setButtonStatus(true);
      setAlignment("testcase");
      setResult("Loading....");
      let data = JSON.stringify({
        code: availableCodes[selectVal],
        lang_id: langs_ids[selectVal],
        input: customTestcase,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `/api/run`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const resp = await axios.request(config, { message: "obj passed" });
      console.log(resp);
      console.log(resp.data);

      if (parseInt(resp.data.judgement.status_id) <= 4) {
        setResult(resp.data.stdout);
        setPassed("success");
        setTestcaseStatus("Compiled Successfully");
      } else {
        setPassed("error");
        setTestcaseStatus(
          statuses[parseInt(resp.data.judgement.status_id) - 1]
        );
        setResult(
          statuses[parseInt(resp.data.judgement.status_id) - 1] +
            "\n" +
            resp.data.decoded?.toString()
        );
      }
    } catch (err) {
      console.log(err);
      setResult(err.response.data.message);
    } finally {
      setAlignment("result");
      setButtonStatus(false);
    }
  };
  const handleRun = async () => {
    try {
      setButtonStatus(true);
      setAlignment("testcase");
      setResult("Loading....");
      let data = JSON.stringify({
        code: availableCodes[selectVal],
        lang_id: langs_ids[selectVal],
        input: customTestcase,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `http://${IP}:3001/judge/custom`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const resp = await axios.request(config);
      console.log(resp.data);

      if (parseInt(resp.data.judgement.status_id) <= 4) {
        setResult(resp.data.stdout);
        setPassed("success");
        setTestcaseStatus("Compiled Successfully");
      } else {
        setPassed("error");
        setTestcaseStatus(
          statuses[parseInt(resp.data.judgement.status_id) - 1]
        );
        setResult(
          statuses[parseInt(resp.data.judgement.status_id) - 1] +
            "\n" +
            resp.data.decoded?.toString()
        );
      }
    } catch (err) {
      setResult(err.response.data.message);
    } finally {
      setAlignment("result");
      setButtonStatus(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setButtonStatus(true);
      setAlignment("result");
      setResult("Loading....");
      let data = JSON.stringify({
        code: availableCodes[selectVal],
        lang_id: langs_ids[selectVal],
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `/api/submit`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const resp = await axios.request(config);
      console.log(resp.data);

      if (resp.data.judgement.status_id == "3") {
        setResult("All Hidden Testcases Passed!!!");
        setPassed("success");
        setTestcaseStatus("Passed");
      } else {
        setPassed("error");
        setTestcaseStatus("Failed");
        setResult(
          statuses[parseInt(resp.data.judgement.status_id) - 1] +
            "\n" +
            resp.data.decoded?.toString()
        );
      }
    } catch (err) {
      setResult(err.response.data.message);
    } finally {
      setButtonStatus(false);
    }
  };

  const sendFileToServer = async (extention, content, name, roll, password) => {
    // const content = document.querySelector("textarea").value;

    const file = new Blob([content], { type: "text/plain" });

    const formData = new FormData();
    formData.append("file", file, `${name + "_" + roll}.txt`);
    console.log(formData);
    var myHeaders = new Headers();
    myHeaders.append("password", password);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formData,
      redirect: "follow",
    };

    fetch(
      `http://${IP}:3001/submit-file?name=${
        name + "_" + roll
      }&extention=${extention}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => alert(result))
      .catch((error) => console.log("error", error));
  };

  const handleFileSend = async () => {
    try {
      setLoading(true);
      console.log(formName, rollNum, password);

      if (formName == "") {
        alert("Name is empty");
      } else if (rollNum == "") {
        alert("Roll Number is empty");
      } else if (password == "") {
        alert("Password is empty");
      } else {
        await sendFileToServer(
          lang_extn[selectVal],
          availableCodes[selectVal],
          formName.replace(/ /g, ""),
          rollNum.replace(/ /g, ""),
          password.replace(/ /g, "")
        );
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function getTests() {
      const token = Cookies.get("token");
      api.defaults.headers.Authorization = `Bearer ${token}`;
      try {
        let response = await api.get(`question/${params.questionId}`);
        console.log("TEST DATA: ", response.data);

        setQuestion(response.data.data);
        response = await api.get(`testcases/${params.questionId}`);
        console.log("testcases: ", response.data);
        let sampleTestcase = response.data.data.filter(
          (testc) => !testc.hidden
        );
        setSampleTestcase(sampleTestcase);

        // setOwnGroup(response.data.closedGroup.createdBy == user.data.uid);
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching closed groups:", error);
      } finally {
      }
    }

    setLoading(true);
    getTests();
  }, []);
  return (
    <>
      <Container
        maxWidth="false"
        sx={{
          mt: 0,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box sx={{ width: "30%", height: "80vh", mr: 0, overflowY: "scroll" }}>
          {question && decodeFromBase64(question?.statement)}
          <Typography variant="h6" sx={{ mt: 2 }}>
            Sample Test Cases:
          </Typography>
          {sampleTestcase?.length > 0 &&
            sampleTestcase.map((testCase, index) => (
              <Box key={index} sx={{ mt: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Sample Test Case {index + 1}:
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  Input:
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                  {decodeFromBase64(testCase.input)}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  Output:
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                  {decodeFromBase64(testCase.output)}
                </Typography>
              </Box>
            ))}
        </Box>

        <Container
          maxWidth="false"
          sx={{
            m: 0,
            display: "flex",
            width: "70%",
            flexDirection: "column",
          }}
        >
          <Container
            maxWidth="false"
            sx={{
              m: 1,
              mr: 0,
              mt: 0,
              // ml:0,
              display: "flex",
              flexDirection: "row",
            }}
          >
            <FormControl
              variant="filled"
              sx={{
                m: 0,
              }}
            >
              <InputLabel id="demo-simple-select-label">Language</InputLabel>
              <Select
                size="small"
                defaultValue={1}
                onChange={(e) => {
                  console.log(lang);
                  setLang(langs[e.target.value]);
                  setSelectVal(e.target.value);
                  setCode(availableCodes[e.target.value]);
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                sx={{
                  m: 0,
                }}
                // value={age}
                label="Language"
                // onChange={handleChange}
              >
                <MenuItem value={0}>C</MenuItem>
                <MenuItem value={1}>CPP</MenuItem>
                <MenuItem value={2}>JAVA</MenuItem>
                <MenuItem value={3}>Python</MenuItem>
              </Select>
            </FormControl>
            <Button
              size="small"
              disabled={buttonStatus}
              sx={{ ml: "auto", alignSelf: "flex-end" }}
              variant="contained"
              color="secondary"
              onClick={handleCheck}
            >
              Run
            </Button>
            <Button
              size="small"
              disabled={buttonStatus}
              sx={{ ml: 1, alignSelf: "flex-end" }}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Container>
          <Box
            sx={{ bgcolor: "#cfe8fc", width: "100%", height: "100%", ml: 1 }}
          >
            {/* {console.log(cppCode) } */}
            <AceEditor
              onChange={(value) => {
                availableSetCodes[selectVal](value);
              }}
              fontSize={fontSize}
              width="100%"
              height="70%"
              mode={lang}
              theme="monokai"
              value={availableCodes[selectVal]}
            />
            <Box sx={{ height: "30%", bgcolor: "white" }}>
              <Box display="flex" flexDirection="row" bgcolor={"white"}>
                <ToggleButtonGroup
                  value={alignment}
                  exclusive
                  // onChange={handleChange}
                  aria-label="Option"
                  sx={{
                    bgcolor: "white",
                  }}
                >
                  <ToggleButton
                    color="secondary"
                    sx={{ width: "8rem" }}
                    onClick={(e) => {
                      setAlignment(e.target.value);
                    }}
                    value="testcase"
                  >
                    TestCase
                  </ToggleButton>
                  <ToggleButton
                    color="primary"
                    sx={{ width: "8rem" }}
                    value="result"
                    onClick={(e) => {
                      setAlignment(e.target.value);
                    }}
                  >
                    Result
                  </ToggleButton>
                </ToggleButtonGroup>
                <Chip
                  sx={{ mt: "auto", mb: "auto", ml: "auto", mr: 3 }}
                  size="medium"
                  label={testcaseStatus}
                  color={passed}
                />
              </Box>
              {buttonStatus ? (
                <LinearProgress
                  color={alignment == "testcase" ? "secondary" : "primary"}
                />
              ) : (
                <Divider light />
              )}
              {/* {console.log(alignment)} */}
              {alignment == "testcase" ? (
                <AceEditor
                  value={customTestcase}
                  onChange={(value) => {
                    setCustomTestcase(value);
                  }}
                  theme="chrome"
                  height="100%"
                  minHeight="10%"
                  style={{ minWidth: "100%" }}
                ></AceEditor>
              ) : alignment == "result" ? (
                <AceEditor
                  value={result}
                  minRows="15"
                  height="100%"
                  readOnly={true}
                  style={{ minWidth: "100%" }}
                ></AceEditor>
              ) : (
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"space-center"}
                  marginTop={1}
                  minHeight={"100%"}
                  width={"80%"}
                >
                  {/* <TextField   label="Name" variant="outlined" fullWidth="false" sx={{
                  width:"30%",
                  mb:1
                  // alignSelf:"center"
                }} />
                <TextField   label="Password" variant="outlined" fullWidth="false" sx={{
                  width:"30%",
                  
                  // alignSelf:"center"
                }} />
                <TextField    label="Roll Number" variant="outlined" fullWidth="false" sx={{
                  width:"30%",
                  alignSelf:""
                  
                  // alignSelf:"center"
                }} /> */}
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <TextField
                        label="Name"
                        value={formName}
                        onChange={(e) => {
                          setFormName(e.target.value);
                        }}
                        variant="outlined"
                      >
                        xs=8
                      </TextField>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        label="Roll Number"
                        value={rollNum}
                        onChange={(e) => {
                          setRollNum(e.target.value);
                        }}
                        variant="outlined"
                      >
                        xs=4
                      </TextField>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      justifyContent={"center"}
                      textAlign={"center"}
                      padding={1}
                      display={"flex"}
                      flexDirection={"row"}
                      alignItems={"center"}
                      sx={{
                        textAlign: "center",
                        justifyContent: "space-around ",
                      }}
                    >
                      {testcaseStatus != "Passed" ? (
                        <WarningIcon color="error" sx={{ mt: 1 }}></WarningIcon>
                      ) : (
                        <CheckCircleIcon
                          color="success"
                          sx={{ mt: 1 }}
                        ></CheckCircleIcon>
                      )}{" "}
                      <TextField
                        value={
                          testcaseStatus != "Passed"
                            ? "Testcases not Passed"
                            : "Testcases Passed"
                        }
                        disabled
                        variant="standard"
                      >
                        Hidden Testcases not Passed
                      </TextField>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        label="Password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        variant="outlined"
                      >
                        xs=4
                      </TextField>
                    </Grid>
                    <Grid item xs={4}>
                      <LoadingButton
                        size="large"
                        onClick={handleFileSend}
                        endIcon={<SendIcon />}
                        loading={loading}
                        loadingPosition="end"
                        variant="contained"
                        sx={{
                          mt: 1,
                          ml: 3,
                          mr: 2,
                          mb: 1,
                        }}
                      >
                        <span>Send</span>
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Box>
          </Box>
        </Container>
      </Container>
    </>
  );
}
