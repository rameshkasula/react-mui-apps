import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getReports } from "src/app/slices/user";
import Page from "../Page";
import ChartPage from "./ChartPage";

const ChartWise = () => {
  const [type, setType] = useState("monthly");
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setType(event.target.value);
  };
  useEffect(() => {
    dispatch(getReports(type));
  }, [dispatch, type]);
  return (
    <Fragment>
      <Page
        title={type.toLocaleUpperCase() + " Reports"}
        action={
          <Box style={{ width: "300px" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Type"
                onChange={handleChange}
              >
                {/* <MenuItem value={"today"}>{"Today"}</MenuItem> */}
                <MenuItem value={"weekly"}>{"Weekly"}</MenuItem>
                <MenuItem value={"monthly"}>{"Monthly"}</MenuItem>
              </Select>
            </FormControl>
          </Box>
        }
      >
        <ChartPage />
      </Page>
    </Fragment>
  );
};

export default ChartWise;
