import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  assignTasktoUser,
  getAllProjects,
  getUserData,
} from "src/app/slices/user";
import { MTypography } from "src/lib";
import Page from "../Page";

const AssignTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { userData, projects } = useSelector((state) => state.user);
  const [searchParams] = useSearchParams();
  //console.log(searchParams.get("userId"));
  const userId = searchParams.get("userId");
  useEffect(() => {
    dispatch(getUserData(userId));
    dispatch(getAllProjects());
  }, [userId, dispatch]);

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const checkFun = (res) => {
    if (res.status === 200) {
      enqueueSnackbar("task assigned", { variant: "success" });
      navigate("/app");
    }
  };

  const handleUpdateAssignTask = (id) => {
    let payload = {
      fullName: userData?.fullName,
      userName: userData?.userName,
      taskId: id,
    };
    dispatch(assignTasktoUser(userId, payload, checkFun));
  };

  return (
    <Fragment>
      <Page title={"Assign Task"}>
        <Container component="main" maxWidth={"xs"}>
          <MTypography title={"Full Name"} titleValue={userData?.fullName} />
          <MTypography title={"User Name"} titleValue={userData?.userName} />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Task</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Task"
              onChange={handleChange}
            >
              {projects.map((item) => (
                <MenuItem
                  key={item?._id}
                  value={item?._id}
                  disabled={item?.isCompleted || item?.isAssigned}
                >
                  {item?.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            type="button"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            disabled={!age}
            onClick={() => handleUpdateAssignTask(age)}
          >
            submit
          </Button>
        </Container>
      </Page>
    </Fragment>
  );
};

export default AssignTask;
