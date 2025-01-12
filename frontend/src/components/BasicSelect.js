import React from "react";
import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";

export default function BasicSelect({ label, name, value, options, onChange }) {
  return (
    <Box sx={{ minWidth: 120, margin: '0.5rem' }}>
  <FormControl fullWidth>
    <InputLabel id={`${name}-label`}>{label}</InputLabel>
    <Select
      labelId={`${name}-label`}
      id={`${name}-select`}
      name={name}
      value={value}
      onChange={onChange}
      label={label}
    >
      {options.map((option, index) => (
        <MenuItem key={index} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Box>

  );
}
