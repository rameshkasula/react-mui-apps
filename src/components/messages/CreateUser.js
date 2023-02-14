import { Box, Button, Container } from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import React, { Fragment } from "react";
import { MTextField } from "src/lib";
import * as Yup from "yup";
import Page from "../Page";

const CreateUser = () => {
  let formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: "",
      userName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      fullName: Yup.string().nullable(true).trim().required(),
      userName: Yup.string().nullable(true).trim().required(),
      email: Yup.string().nullable(true).trim().required(),
      password: Yup.string().nullable(true).trim().required(),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Fragment>
      <Page title={"Create User"}>
        <Container component="main" maxWidth={"xs"}>
          <Box>
            <FormikProvider value={formik}>
              <Form noValidate onSubmit={formik.handleSubmit}>
                <MTextField name={"firstName"} label={"FirstName"} />
                <MTextField name={"userName"} label={"UserName"} />
                <MTextField name={"email"} type={"email"} label={"Email"} />
                <MTextField
                  name={"password"}
                  type={"password"}
                  label={"Password"}
                />
                <Button fullWidth type="submit" variant="contained">
                  Submit
                </Button>
              </Form>
            </FormikProvider>
          </Box>
        </Container>
      </Page>
    </Fragment>
  );
};

export default CreateUser;
