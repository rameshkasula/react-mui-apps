import React, { Fragment, useEffect } from "react";
import MDataTable from "../../lib/MDataTable";
import Page from "../Page";
import { Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteProjects, getAllProjects } from "src/app/slices/user";
import { Link } from "react-router-dom";

export default function ProjectTable() {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.user);

  const checkFun = (res) => {
    console.log(res);
    if (res.status === 200) {
      dispatch(getAllProjects());
    }
  };
  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  const columns = [
    { field: "title", headerName: "Title", width: 200 },
    { field: "category", headerName: "Category", width: 200 },
    {
      field: "createdAt",
      headerName: "Date",
      width: 220,
      type: Date,
      valueGetter: (params) =>
        `${new Date(params.row.createdAt).toLocaleString() || ""} `,
    },
    {
      field: "actions",
      headerName: "Actions",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <span style={{ align: "right", float: "right" }}>
          <IconButton>
            <EditIcon />
          </IconButton>
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
        title={"Projects"}
        action={
          <Button variant="contained" component={Link} to={"/projects/create"}>
            {"Create"}
          </Button>
        }
      >
        <MDataTable rows={projects} columns={columns} />
      </Page>
    </Fragment>
  );
}
