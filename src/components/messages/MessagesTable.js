import React, { Fragment, useEffect } from "react";
import MDataTable from "../../lib/MDataTable";
import Page from "../Page";
import { Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers } from "src/app/slices/user";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import AssignmentIcon from "@mui/icons-material/Assignment";

export default function MessagesTable() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const checkFun = (res) => {
    if (res.status === 200) {
      enqueueSnackbar("user deleted", { variant: "success" });
      dispatch(getAllUsers());
    }
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const columns = [
    { field: "fullName", headerName: "Full name", width: 200 },
    { field: "userName", headerName: "User name", width: 200 },

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
      width: 180,
      renderCell: (params) => (
        <span style={{ align: "right", float: "right" }}>
          <IconButton
            component={Link}
            to={`/app/update?userId=${params.row._id}`}
          >
            <CheckBoxIcon />
          </IconButton>

          <IconButton
            component={Link}
            to={`/app/assign?userId=${params.row._id}`}
          >
            <AssignmentIcon />
          </IconButton>
          <IconButton
            onClick={() => dispatch(deleteUser(params.row._id, checkFun))}
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
        title={"Users"}
        action={
          <Button variant="contained" component={Link} to={"/app/create"}>
            {"Create"}
          </Button>
        }
      >
        <MDataTable rows={users} columns={columns} />
      </Page>
    </Fragment>
  );
}
