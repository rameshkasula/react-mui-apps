import * as React from "react";

import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import Box from "@mui/material/Box";
import { useFormikContext } from "formik";

function getWeeksAfter(date, amount) {
  return date ? date.add(amount, "week") : undefined;
}

export default function MDateRangePicker({ formik }) {
  const [value, setValue] = React.useState([null, null]);
  const { setFieldValue } = useFormikContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateRangePicker
        disablePast
        value={value}
        maxDate={getWeeksAfter(value[0], 4)}
        onChange={(newValue) => {
          setValue(newValue);
          let one = new Date(newValue[0]).toLocaleDateString();
          let two = new Date(newValue[1]).toLocaleDateString();

          console.log(
            new Date(newValue[0]).toLocaleDateString(),
            new Date(newValue[1]).toLocaleDateString()
          );
          setFieldValue("dueDate", two);
          setFieldValue("createdDate", one);
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField fullWidth {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField fullWidth {...endProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
}
