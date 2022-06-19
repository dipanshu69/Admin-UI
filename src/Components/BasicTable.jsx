import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import { CssBaseline } from "@material-ui/core";
import TablePagination from "@mui/material/TablePagination";
import SearchBar from "material-ui-search-bar";
//import SearchBar from "./search";
import Box from "@mui/material/Box";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
} from "@material-ui/core";
import axios from "axios";
import ReadOnly from "./ReadOnly";
import EditRow from "./EditRow";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    borderRadius: 15,
    margin: "10px 10px",
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
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
}));

const BasicTable = () => {
  const [userList, setuserList] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [userPerPage, setUserPerPage] = React.useState(10);
  const classes = useStyles();
  const [editUserData, setEditUserData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const getUsers = async () => {
    try {
      let res = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setuserList(res.data);
      setSearchData(res.data);
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleEditClick = (e, user) => {
    e.preventDefault();
    setEditUserId(user.id);

    const formvalues = {
      name: user.name,
      email: user.email,
      role: user.role,
    };

    setEditUserData(formvalues);
  };

  const handleEditUserChange = (e) => {
    e.preventDefault();
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;

    const newFormData = { ...editUserData };
    newFormData[fieldName] = fieldValue.toLowerCase();

    setEditUserData(newFormData);
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    const editedUser = {
      id: editUserId,
      name: editUserData.name,
      email: editUserData.email,
      role: editUserData.role,
    };
    const newUsers = [...userList];
    const index = userList.findIndex((user) => user.id === editUserId);

    newUsers[index] = editedUser;
    setuserList(newUsers);
    setSearchData(newUsers);
    setEditUserId(null);
  };

  const handleCancelClick = () => {
    setEditUserId(null);
  };

  const handleDeleteClick = (userid) => {
    const deleteUser = [...userList];
    const index = userList.findIndex((user) => user.id === userid);

    deleteUser.splice(index, 1);

    setuserList(deleteUser);
    setSearchData(deleteUser);
  };

  const handleSearch = (searchValue) => {
    if (searchValue == "") {
      setuserList(searchData);
    } else {
      const filterResult = searchData.filter((user) =>
        user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.role.toLowerCase().includes(searchValue.toLowerCase()))
      setuserList(filterResult);
    }
    setSearchTerm(searchValue);
  };

  const cancelSearch = () => {
    setSearchTerm("");
    setuserList(searchData);
  };

  return (
    <div className="container-sm">
      <Box>
        <SearchBar
          placeholder="Search by name, email or role"
          value={searchTerm}
          onChange={(searchValue) => handleSearch(searchValue)}
          onCancelSearch={() => cancelSearch()}
        />
      </Box>
      <form onSubmit={handleEditFormSubmit}>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeaderCell}>
                  <Checkbox />
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
              {userList.map((user) => (
                <Fragment>
                  {editUserId === user.id ? (
                    <EditRow
                      handleCancelClick={handleCancelClick}
                      handleEditUserChange={handleEditUserChange}
                      editUserData={editUserData}
                    />
                  ) : (
                    <ReadOnly
                      user={user}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                  )}
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <CssBaseline />
      </form>
    </div>
  );
};

export default BasicTable;

/*<TablePagination
.slice(page * userPerPage, page * userPerPage + userPerPage)
rowsPerPageOptions={[10, 25, 100]}
component="div"
count={userList.length}
rowsPerPage={userPerPage}
page={page}
onPageChange={handleChangePage}
onRowsPerPageChange={handleChangeRowsPerPage}
 const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setUserPerPage(+event.target.value);
    setPage(0);
  };
/>
 <SearchBar
          //placeholder="Search by name, email or role"
          value={searched}
          onChange={(searchValue) => handleSearch(searchValue)}
          onCancelSearch={(e) => cancelSearch(e.target.value)}
        />
       onCancelSearch={() => cancelSearch()}
*/
