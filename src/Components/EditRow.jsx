import React from "react";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import Box from "@mui/material/Box";
import { Stack, TextField } from "@mui/material";
import { TableCell, TableRow } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@mui/material/Button";

const useStyles = makeStyles((theme) => ({
  role: {
    fontWeight: "bold",
    fontSize: "0.75rem",
    color: "white",
    backgroundColor: "grey",
    borderRadius: 8,
    padding: "3px 10px",
    display: "inline-block",
  },
}));

const EditRow = ({ editUserData, handleEditUserChange, handleCancelClick }) => {
    const classes = useStyles();
  return (
    <TableRow
      key={editUserData.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell>
        <Checkbox />
      </TableCell>
      <TableCell>
        <TextField
          label="name"
          value={editUserData.name}
          onChange={handleEditUserChange}
          id="name"
          required="required"
          variant="outlined"
          title="name"
          name="name"
          placeholder="Enter a name"
          fullWidth
        />
      </TableCell>
      <TableCell>
        {" "}
        <TextField
          label="email"
          value={editUserData.email}
          onChange={handleEditUserChange}
          id="email"
          required="required"
          variant="outlined"
          title="email"
          name="email"
          placeholder="Enter an email"
          fullWidth
        />
      </TableCell>
      <TableCell>
          <TextField
            label="role"
            value={editUserData.role}
            onChange={handleEditUserChange}
            id="role"
            required="required"
            variant="outlined"
            title="role"
            name="role"
            placeholder="Add a role"
            fullWidth
          />
      </TableCell>
      <TableCell>
        <Box>
          <Stack direction="row">
            <Button type="submit">
              <SaveRoundedIcon />
            </Button>
            <Button type="button" onClick={handleCancelClick}>
              <CancelRoundedIcon />
            </Button>
          </Stack>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default EditRow;
