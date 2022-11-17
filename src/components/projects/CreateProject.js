import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import React, { Fragment } from "react";
import { MTextField } from "src/lib";
import Page from "../Page";
import { Box, Button } from "@mui/material";

export default function CreateProject() {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      imageURL: "",
      category: "",
    },
    validationSchema: Yup.object().shape({
      title: Yup.string("Enter your project title")
        .trim()
        .nullable(true)
        .required("Project Title is required"),
      lastName: Yup.string("Enter your Last Name")
        .trim()
        .nullable(true)
        .required("Image is required"),
      category: Yup.string("Enter your Category")
        .trim()
        .nullable(true)
        .required("Category is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      alert("jjj");
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
