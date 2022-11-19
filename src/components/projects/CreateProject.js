import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import React, { Fragment } from "react";
import { MImageUpload, MTextField } from "src/lib";
import Page from "../Page";
import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { createProject } from "src/app/slices/user";
import { useNavigate } from "react-router-dom";

export default function CreateProject() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkFun = (res) => {
    console.log(res);
    if (res.status === 201) {
      navigate(-1);
    }
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      imageURL: "",
      category: "",
      link: "",
    },
    validationSchema: Yup.object().shape({
      title: Yup.string("Enter your project title")
        .trim()
        .nullable(true)
        .required("Project Title is required"),
      category: Yup.string("Enter your Category")
        .trim()
        .nullable(true)
        .required("Category is required"),
      link: Yup.string("Enter your Link")
        .trim()
        .nullable(true)
        .required("Link is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      dispatch(createProject(values, checkFun));
      //  alert("jjj");
    },
  });

  return (
    <Fragment>
      <Page title={"Create Project"}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FormikProvider value={formik}>
            <Form noValidate onSubmit={formik.handleSubmit}>
              <MTextField label="Project Title" name="title" />
              <MTextField label="Category" name="category" />
              <MTextField label="Link" name="link" />
              <MImageUpload name={"imageURL"} label="Image" />
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
