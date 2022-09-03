import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import { Stack, Typography } from "@mui/material";
import { TableCell, TableRow } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@mui/material/Button";

const useStyles = makeStyles((theme) => ({
  tableCell:{
    paddingTop: 9,
    paddingBottom: 9,
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

const ReadOnly = ({
  user,
  handleEditClick,
  handleDeleteClick,
  rowCheckBoxClick,
}) => {
  const classes = useStyles();

  return (
    <TableRow
      key={user.id}
      className={user.isChecked ? classes.onCheckbackgroundColor : ""}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell className={classes.tableCell}>
        <Checkbox
          checked={user.isChecked ? true : false}
          onChange={(e) => rowCheckBoxClick(e, user.id)}
          color="secondary"
        />
      </TableCell>
      <TableCell className={classes.tableCell}>{user.name}</TableCell>
      <TableCell className={classes.tableCell}>{user.email}</TableCell>
      <TableCell className={classes.tableCell}>
        <Typography
          className={classes.role}
          style={{
            backgroundColor:
              (user.role === "admin" && "green") ||
              (user.role === "member" && "blue"),
          }}
        >
          {user.role}
        </Typography>
      </TableCell>
      <TableCell className={classes.tableCell}>
        <Box justifyContent="space-around">
          <Stack direction="row">
            <Button onClick={(e) => handleEditClick(e, user)}>
              <EditIcon />
            </Button>
            <Button onClick={() => handleDeleteClick(user.id)}>
              <DeleteIcon />
            </Button>
          </Stack>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default ReadOnly;
