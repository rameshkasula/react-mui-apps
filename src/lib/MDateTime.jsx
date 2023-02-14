import { TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";
import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

function MDateTime({ name, ...otherProps }) {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (newValue) => {
    // formik.setFieldValue("dateOfBirth", newValue);
    // setValue(newValue);
    setFieldValue(name, newValue);
  };
  const configDateTime = {
    ...field,
    ...otherProps,
    variant: "outlined",
    type: "date",
    required: true,

    inputFormat: "MM/dd/yyyy",
    margin: "normal",
    fullWidth: true,
    InputLabelProps: {
      shrink: true,
    },
  };
  if (meta && meta.touched && meta.error) {
    configDateTime.error = true;
    configDateTime.helperText = meta.error;
  }
  return <TextField {...configDateTime} />;
}

export default MDateTime;
