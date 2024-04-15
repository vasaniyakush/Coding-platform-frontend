"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Fab,
  Modal,
  Skeleton,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Cookies from "js-cookie";
import api from "@/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { decodeFromBase64 } from "@/utils";
import EditQuestionModal from "@/components/editQuestionModal";
import AddQuestionModal from "./addQuestionModal";

// // AddClosedGroupModal

export default function QuestionsTable(props) {
  //   const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [editQuestionOpen, setEditQuestionOpen] = useState(false);
  const [currentdata, setCurrentdata] = useState({});
  //   const theme = useTheme();
  // console.log(props)
  const handleEditQuestionOpen = (params) => {
    setEditQuestionOpen(true);
    setCurrentdata(params.row);
  };

  const handleEditQuestionClose = () => setEditQuestionOpen(false);
  const theme = useTheme();
  const { questions, toggleRefresh } = props;
  console.log("QUESTIONS: ", questions);

  const columns = [
    {
      // field:"id",

      renderCell: (params) => {
        // { console.log("params", params.row) }
        return (
          //   <Link target="_blank" href={"/closed-groups/" + params.row.id}>
          <Button
            onClick={() => {
              handleEditQuestionOpen(params);
            }}
            color="error"
          >
            Edit
          </Button>
          //   </Link>
        );
      },
    },
    { field: "id", headerName: "ID" },
    {
      field: "statement",
      headerName: "Statement",
      width: 400,
      valueGetter: (params) => `${decodeFromBase64(params.row.statement)}`,
    },
    { field: "hiddenCount", headerName: "Hidden TestCases" },
    { field: "totalcases", headerName: "Total TestCases" },
    // {
    //   renderCell: (params) => {
    //     return (
    //       <Button
    //         onClick={() => {
    //           handleEditQuestionOpen();
    //         }}
    //       >
    //         Create testcases
    //       </Button>
    //     );
    //   },
    // },
  ];

  useEffect(() => {}, []);

  return (
    <>
      <Box disableGutters sx={{ height: "60vh" }}>
        <ThemeProvider theme={theme}>
          <DataGrid
            // editMode="false"
            rows={questions}
            columns={columns}
            autoPageSize
            // loading={loading}
            disableRowSelectionOnClick
            disableColumnSelector
            disableColumnMenu
            disableColumnFilter
            disableDensitySelector
            // onRowClick={handleRowClick}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
          />
        </ThemeProvider>
      </Box>
      <Modal
        open={editQuestionOpen}
        onClose={handleEditQuestionClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <EditQuestionModal
            setEditQuestionOpen={setEditQuestionOpen}
            currentdata={currentdata}
            toggleRefresh={toggleRefresh}
            // refresh={toggleRefresh}
          />
        </Box>
      </Modal>

      {/* </Container> */}
    </>
  );
}
