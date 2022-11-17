import React, { Fragment, useEffect } from "react";
import MDataTable from "../../lib/MDataTable";
import Page from "../Page";
import { Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { getAllRequests } from "src/app/slices/user";

export default function MessagesTable() {
  const dispatch = useDispatch();
  const { requests } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllRequests());
  }, [dispatch]);

  const columns = [
    { field: "fullName", headerName: "Full name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
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
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </span>
      ),
    },
  ];

  return (
    <Fragment>
      <Page
        title={"Requests"}
        action={<Button variant="contained">{"Create"}</Button>}
      >
        <MDataTable rows={requests} columns={columns} />
      </Page>
    </Fragment>
  );
}
