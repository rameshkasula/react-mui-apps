import React, { Fragment } from "react";
import { Container } from "@mui/material";
import moment from "moment";
import { LocalizationProvider, DateRangePicker } from "@mui/x-date-pickers-pro";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

export default function Home() {
  const [value, setValue] = React.useState([
    moment().startOf("month"),
    moment().endOf("day"),
  ]);

  return (
    <Fragment>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DateRangePicker
            disableFuture={true}
            format="DD/MM/YYYY"
            startText="Start Date"
            endText="End Date"
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        </LocalizationProvider>
      </Container>
    </Fragment>
  );
}
