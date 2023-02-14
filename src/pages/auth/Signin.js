import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAuth } from "../../contexts/auth";
import { useDispatch } from "react-redux";
import { signinUser } from "src/app/slices/user";
import { useSnackbar } from "notistack";

export default function SignIn() {
  const auth = useAuth();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const cbFun = (res) => {
    console.log(res);

    if (res.status === 200) {
      enqueueSnackbar("Login Successfull", { variant: "success" });

      auth.login(res.data.data);
    } else if (res.statusCode === 400) {
      enqueueSnackbar(res.message, { variant: "error" });
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      email: data.get("email"),
      password: data.get("password"),
    };

    dispatch(signinUser(payload, cbFun));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Typography
                component={Link}
                to="/auth/signup"
                variant="body"
                gutterBottom
                noWrap
                color={"inherit"}
                sx={{ textDecoration: "none" }}
              >
                Forgot password?
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                component={Link}
                to="/auth/signup"
                variant="body"
                gutterBottom
                noWrap
                color={"inherit"}
                sx={{ textDecoration: "none" }}
              >
                {"Don't have an account? Sign Up"}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
