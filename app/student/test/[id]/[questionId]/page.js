"use client";
import { decodeFromBase64, encodeToBase64, getIPv4Addresses } from "@/utils";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Link from "next/link";
import { useEffect, useState } from "react";
import CachedIcon from "@mui/icons-material/Cached";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Cookies from "js-cookie";
import api from "@/api";
export default function Home({ params }) {
  // const networkInterfaces = getIPv4Addresses();
  // console.log("networkInterfaces: ", networkInterfaces);
  // const arr = Object.keys(networkInterfaces).map((address) => {
  //   return `http://${networkInterfaces[address][0]}:3000/ `;
  // });
  const [tests, setTests] = useState([]);
  console.log("prams: ", params);
  const [refresh, setRefresh] = useState(false);
  const toggleRefresh = () => {
    console.log("CALLED");
    setRefresh(!refresh);
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getTests() {
      const token = Cookies.get("token");
      api.defaults.headers.Authorization = `Bearer ${token}`;
      try {
        let response = await api.get(`test`);
        console.log("TEST DATA: ", response.data);
        const runningTests = response.data.data.filter(
          (test) => test.status == "running"
        );
        setTests(runningTests);
        // setOwnGroup(response.data.closedGroup.createdBy == user.data.uid);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching closed groups:", error);
      } finally {
      }
    }

    setLoading(true);
    getTests();
  }, [refresh]);
  return (
    <>
      Hello test Id {params.id} questionId {params.questionId}
    </>
  );
}
