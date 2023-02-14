import { Container, Typography } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MTypography } from "src/lib";
import MDataTable from "src/lib/MDataTable";
import Page from "../Page";
import { IconButton } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { ChangeTaskStatus, getUserData } from "src/app/slices/user";
import { useSnackbar } from "notistack";

const UpdateProject = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { userData } = useSelector((state) => state.user);
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  useEffect(() => {
    dispatch(getUserData(userId));
  }, [userId, dispatch]);

  const checkFun = (res) => {
    if (res.status === 200) {
      enqueueSnackbar("task Status changed", { variant: "success" });
      navigate("/tasks");
    }
  };

  const updateTaskStatus = (data) => {
    const { _id, createdAt, updatedAt, ...other } = data;
    let payload = { ...other, isCompleted: !other?.isCompleted };
    dispatch(ChangeTaskStatus(_id, payload, checkFun));
  };

  const columns = [
    {
      field: "Title",
      headerName: "Task Name",
      width: 200,
      renderCell: (params) => <Typography>{params.row?.title}</Typography>,
    },
    {
      field: "Status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <Typography color={params.row.isCompleted ? "greenyellow" : "red"}>
          {params.row?.isCompleted ? "Completed" : "Pending"}
        </Typography>
      ),
    },
    {
      field: "createdDate",
      headerName: "Created Date",
      width: 220,
      type: Date,
      valueGetter: (params) =>
        `${new Date(params.row?.createdDate).toLocaleString() || ""} `,
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 220,
      type: Date,
      valueGetter: (params) =>
        `${new Date(params.row?.dueDate).toLocaleString() || ""} `,
    },
    {
      field: "actions",
      headerName: "Actions",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 180,
      renderCell: (params) => (
        <span style={{ align: "right", float: "right" }}>
          <IconButton onClick={() => updateTaskStatus(params.row)}>
            <CheckBoxIcon />
          </IconButton>
        </span>
      ),
    },
  ];

  return (
    <Fragment>
      <Page title={"Update Task"}>
        <Container component="main" maxWidth={"xs"}>
          <MTypography title={"Full Name"} titleValue={userData?.fullName} />
          <MTypography title={"User Name"} titleValue={userData?.userName} />
        </Container>
        {userData.tasks && userData?.tasks.length > 0 && (
          <MDataTable rows={userData.tasks} columns={columns} />
        )}
      </Page>
    </Fragment>
  );
};

export default UpdateProject;
