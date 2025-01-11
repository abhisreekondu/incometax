import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function BasicTextFields({ label, name, value, placeholder,type = "text", onChange }) {
  return (
    <Box>
      <TextField
        fullWidth
        label={label}
        name={name}
        value={value}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        variant="outlined"
      />
    </Box>
  );
}
