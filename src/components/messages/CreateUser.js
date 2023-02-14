import { Box, Button, Container } from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import { useSnackbar } from "notistack";
import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupUser } from "src/app/slices/user";
import { MTextField } from "src/lib";
import * as Yup from "yup";
import Page from "../Page";

const CreateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const cbFun = (res) => {
    if (res.status === 201) {
      enqueueSnackbar("user created", { variant: "success" });
      navigate("/app");
    }
  };

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
      dispatch(signupUser(values, cbFun));
    },
  });
  return (
    <Fragment>
      <Page title={"Create User"}>
        <Container component="main" maxWidth={"xs"}>
          <Box>
            <FormikProvider value={formik}>
              <Form noValidate onSubmit={formik.handleSubmit}>
                <MTextField name={"fullName"} label={"FullName"} />
                <MTextField name={"userName"} label={"UserName"} />
                <MTextField name={"email"} type={"email"} label={"Email"} />
                <MTextField
                  name={"password"}
                  type={"password"}
                  label={"Password"}
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
        </Container>
      </Page>
    </Fragment>
  );
};

export default CreateUser;
