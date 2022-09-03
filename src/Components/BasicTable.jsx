import React, { useState, useEffect, Fragment } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { Box } from "@mui/system";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ReadOnly from "./ReadOnly";
import EditRow from "./EditRow";
import Paper from '@material-ui/core/Paper';
import "../App.css";

import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 15,
    display: 'flex',
    overflowX: 'hide',
  },
  table: {
    minWidth: 340,
  },
  tableHeaderCell: {
    paddingTop: 9,
    paddingBottom: 9,
    paddingRight: 2,
    paddingLeft: 3,
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },
}));

const BasicTable = ({
  users,
  editUserId,
  editUserData,
  handleEditClick,
  handleEditUserChange,
  handleEditFormSubmit,
  handleCancelClick,
  handleDeleteClick,
  checkBoxClicked,
  handleDeleteButtonClick,
}) => {
  const classes = useStyles();
  const userPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [checkAll, setCheckAll] = useState(false);
  const [Check, setCheck] = useState(false);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(users?.length / userPerPage)
  );
  const [newUsers, setNewUsers] = useState(
    users.slice(
      (currentPage - 1) * userPerPage,
      (currentPage - 1) * userPerPage + userPerPage
    )
  );

  const perPageData = () => {
    const start = (currentPage - 1) * userPerPage;
    const final = start + userPerPage;
    setNewUsers(users.slice(start, final));
  };

  useEffect(() => {
    perPageData();
  }, [users, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages !== 0) {
      setCurrentPage(totalPages);
    }
  }, [users?.length, totalPages, currentPage]);

  useEffect(() => {
    setTotalPages(Math.ceil(users?.length / userPerPage));
    setCheck(
      users.reduce((i, user) => {
        return i || user.isChecked;
      }, false)
    );
  }, [users]);

  useEffect(() => {
    setCheckAll(
      newUsers.reduce((i, user) => {
        return i && user.isChecked;
      }, true)
    );
  }, [currentPage, users, newUsers]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const rowCheckBoxClick = (e, id) => {
    checkBoxClicked(id);
  };

  const allRowsCheckBoxClick = (event) => {
    if (event.target.checked)
      newUsers?.map((user) => !user.isChecked && checkBoxClicked(user.id));
    else newUsers?.map((user) => user.isChecked && checkBoxClicked(user.id));
  };

  return (
    <div>
      <div className={classes.root}>
        {users.length && (
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeaderCell}>
                  <Checkbox
                    checked={Check ? (checkAll ? true : false) : false}
                    onChange={(e) => allRowsCheckBoxClick(e)}
                    color="secondary"
                  />
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>Name</TableCell>
                <TableCell className={classes.tableHeaderCell}>Email</TableCell>
                <TableCell className={classes.tableHeaderCell}>Role</TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {newUsers.map((user) => (
                <Fragment>
                  {editUserId === user.id ? (
                    <EditRow
                      key={user.id}
                      user={user}
                      editUserData={editUserData}
                      handleEditUserChange={handleEditUserChange}
                      handleEditFormSubmit={handleEditFormSubmit}
                      handleCancelClick={handleCancelClick}
                      rowCheckBoxClick={rowCheckBoxClick}
                    />
                  ) : (
                    <ReadOnly
                      key={user.id}
                      user={user}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                      rowCheckBoxClick={rowCheckBoxClick}
                    />
                  )}
                </Fragment>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      <Box 
      className="footer"
        mt={2}
        mb={2} 
        display="flex"
        alignItems="center"
        justifyContent="space-around"
       
      >
        <Button
          className="del-btn"
          disabled={!Check ? true : false}
          variant="contained"
          onClick={handleDeleteButtonClick}
          startIcon={<DeleteIcon />}
         
        >
          Delete Selected
        </Button>
        {totalPages > 1 && (
          <Pagination
            color="secondary"
            onChange={handlePageChange}
            page={currentPage}
            shape="circular"
            count={totalPages}
            showFirstButton
            showLastButton
          />
        )}
      </Box>
    </div>
  );
};

export default BasicTable;
