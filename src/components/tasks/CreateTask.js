import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import React, { Fragment } from "react";
import {
  MCheckbox,
  MDateRangePicker,
  MDateTime,
  MImageUpload,
  MTextField,
} from "src/lib";
import Page from "../Page";
import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { createProject } from "src/app/slices/user";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function CreateTask() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const checkFun = (res) => {
    if (res.status === 200) {
      enqueueSnackbar("task created", { variant: "success" });
      navigate("/tasks");
    }
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      createdDate: "",
      dueDate: "",
      isCompleted: false,
    },
    validationSchema: Yup.object().shape({
      title: Yup.string("Enter your project title")
        .trim()
        .nullable(true)
        .required("Task Title is required"),
      dueDate: Yup.string("Enter your dueDate")
        .trim()
        .nullable(true)
        .required("dueDate is required"),
      isCompleted: Yup.bool("Enter your isCompleted").nullable(true),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(createProject(values, checkFun));
    },
  });

  return (
    <Fragment>
      <Page title={"Create Task"}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FormikProvider value={formik}>
            <Form noValidate onSubmit={formik.handleSubmit}>
              <MTextField label="Task Title" name="title" />

              <MDateRangePicker formik={formik} />

              <MCheckbox
                label={"Is completed"}
                name={"isCompleted"}
                legend={"Is Completed"}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                submit
              </Button>
            </Form>
          </FormikProvider>
        </Box>
      </Page>
    </Fragment>
  );
}
