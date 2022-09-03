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
  tableCell:{
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 2,
    paddingLeft: 3,
  },
  role: {
    fontWeight: "bold",
    fontSize: "0.75rem",
    color: "white",
    backgroundColor: "grey",
    borderRadius: 8,
    padding: "3px 10px",
    display: "inline-block",
  },
  onCheckbackgroundColor: {
    backgroundColor: "lightgrey",
  },
}));

const EditRow = ({
  user,
  editUserData,
  handleEditUserChange,
  handleEditFormSubmit,
  handleCancelClick,
  rowCheckBoxClick,
}) => {
  const classes = useStyles();

  return (
    <TableRow
      key={user.id}
      className={user.isChecked ? classes.onCheckbackgroundColor : null}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell className={classes.tableCell}>
        <Checkbox
          checked={user.isChecked ? true : false}
          onChange={(e) => rowCheckBoxClick(e, user.id)}
          color="secondary"
        />
      </TableCell>
      <TableCell className={classes.tableCell}>
        <TextField
          label="name"
          value={editUserData.name}
          onChange={handleEditUserChange}
          id="name"
          required
          variant="outlined"
          title="name"
          name="name"
          placeholder="Enter a name"
          fullWidth
        />
      </TableCell>
      <TableCell className={classes.tableCell}>
        <TextField
          label="email"
          value={editUserData.email}
          onChange={handleEditUserChange}
          id="email"
          required
          variant="outlined"
          title="email"
          name="email"
          placeholder="Enter an email"
          fullWidth
        />
      </TableCell>
      <TableCell className={classes.tableCell}>
        <TextField
          label="role"
          value={editUserData.role}
          onChange={handleEditUserChange}
          id="role"
          required
          variant="outlined"
          title="role"
          name="role"
          placeholder="Add a role"
          fullWidth
        />
      </TableCell>
      <TableCell className={classes.tableCell}>
        <Box>
          <Stack direction="row">
            <Button type="submit" onClick={handleEditFormSubmit}>
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

/* 


*/
