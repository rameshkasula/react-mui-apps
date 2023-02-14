import React, { Fragment, useEffect } from "react";
import MDataTable from "../../lib/MDataTable";
import Page from "../Page";
import { Button, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteProjects, getAllProjects } from "src/app/slices/user";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function TaskTable() {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();

  const checkFun = (res) => {
    if (res.status === 200) {
      enqueueSnackbar("task deleted", { variant: "success" });

      dispatch(getAllProjects());
    }
  };
  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  const columns = [
    { field: "title", headerName: "Title", width: 200 },
    {
      field: "created Date",
      headerName: "Start Date",
      width: 220,
      type: Date,
      valueGetter: (params) =>
        `${new Date(params.row.createdDate).toLocaleString() || ""} `,
    },
    {
      field: "Due Date",
      headerName: "Due Date",
      width: 220,
      type: Date,
      valueGetter: (params) =>
        `${new Date(params.row.dueDate).toLocaleString() || ""} `,
    },
    {
      field: "isCompleted",
      headerName: "Status",
      width: 220,
      type: Date,
      renderCell: (params) => (
        <Typography color={params.row.isCompleted ? "greenyellow" : "red"}>
          {params.row.isCompleted ? "Completed" : "Pending"}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <span style={{ align: "right", float: "right" }}>
          {/* <IconButton>
            <EditIcon />
          </IconButton> */}
          <IconButton
            onClick={() => dispatch(deleteProjects(params.row._id, checkFun))}
          >
            <DeleteIcon />
          </IconButton>
        </span>
      ),
    },
  ];

  return (
    <Fragment>
      <Page
        title={"Tasks"}
        action={
          <Button variant="contained" component={Link} to={"/tasks/create"}>
            {"Create"}
          </Button>
        }
      >
        <MDataTable rows={projects} columns={columns} />
      </Page>
    </Fragment>
  );
}
