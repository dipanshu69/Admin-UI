import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import BasicTable from "./Components/BasicTable";
import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import SearchBar from "material-ui-search-bar";

function App() {
  const [userList, setUserList] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editUserId, setEditUserId] = useState(null);
  const [editUserData, setEditUserData] = useState({
    name: "",
    email: "",
    role: "",
  });

  /**
   * Make API call to get the user list and store it to display the users
   *
   * @returns { Array.<user> }
   *      Array of objects with complete data on all available users
   *
   */

  const getUsers = async () => {
    try {
      setLoader(true);
      const response = await axios.get(
        `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
      );
      setLoader(false);
      setUserList(response.data.map((user) => ({ ...user, isChecked: false })));
    } catch (e) {
      console.log(e);
    }
    setLoader(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  /**
   * Definition for search handler
   * This is the function that is called on adding new search keys
   *
   * @state {string} text
   *    Text user types in the search bar. To filter the displayed users based on this text.
   *
   * @returns { Array.<user> }
   *      Array of objects with complete data on filtered set of users
   *
   */
  useEffect(() => {
    if (searchTerm.length > 0) {
      setNewUsers(
        userList?.filter((user) => {
          if (
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.role?.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return user;
          }
        })
      );
    } else {
      setNewUsers(userList);
    }
  }, [searchTerm, userList]);

   /**
   * Definition of checkBoxClicked function
   * This is the function that is called if any of the check box gets clicked
   *
   * @param {string} id
   *    user id of clicked user
   *
   * @returns { Array.<user> }
   *      Array of object with different styling for clicked user
   *
   */

  const checkBoxClicked = (id) => {
    let tempMembers = [...userList];
    tempMembers.forEach((user) => {
      if (user.id === id) {
        user.isChecked = !user.isChecked;
      }
    });
    setUserList(tempMembers);
  };

    /**
   * Definition of handleEditClick function
   * This function is called when Edit button is clicked for any user
   *
   * @param {Object} user
   *    
   *
   * @returns { Array.<user> }
   *    display EditRow Component for that user to change the user data 
   *
   */

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

    /**
   * Definition of handleEditUserChange function
   * This function is replace the old value with the new value
   *
   * @param {Object} user
   *    
   *
   * @returns { Array.<user> }
   *   change the input field with the new value
   *
   */
  const handleEditUserChange = (e) => {
    e.preventDefault();
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;
    const newFormData = { ...editUserData };
    newFormData[fieldName] = fieldValue.toLowerCase();

    setEditUserData(newFormData);
  };

     /**
   * Definition of handleEditFormSubmit function
   * This is the function that is called when save button is clicked for the selected user
   *
   * @param {Object} user
   *    
   *
   * @returns { Array.<user> }
   *   save and return the user object with new values
   *
   */
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
    setUserList(newUsers);
    setEditUserId(null);
  };
    /**
   * Definition of handleCancelClick function
   * This function is called when cancel button is clicked for the selected user
   *
   * @param {Object} user
   *    
   *
   * @returns { Array.<user> }
   *   display ReadOnly Component for that user
   *
   */
  const handleCancelClick = () => {
    setEditUserId(null);
  };

   /**
   * Definition of handleDeleteClick function
   * This function is called when inline delete button is clicked for the specific user
   *
   * @param {String} userid
   *     user id of that user on which delete button is clicked
   *
   * @returns { Array.<user> }
   *  Array of objects with complete data after deleting the user
   *
   */
  const handleDeleteClick = (userid) => {
    const deleteUser = [...userList];
    const index = userList.findIndex((user) => user.id === userid);
    deleteUser.splice(index, 1);
    setUserList(deleteUser);
  };

   /**
   * Definition of handleDeleteButtonClick function
   * This function is called when delete button is clicked for all the selected user from checkbox 
   *
   *  @returns { Array.<user> }
   *  Array of objects with complete data after deleting the users
   *
   */
  const handleDeleteButtonClick = () => {
    let selectedUser = [...userList];
    selectedUser = selectedUser.filter((user) => !user.isChecked);
    setUserList(selectedUser);
  };

  return (
    <div className="mt-5 container">
      <div className=" container">
        <SearchBar
          placeholder="Sarch by name email or role"
          value={searchTerm}
          onChange={(newValue) => setSearchTerm(newValue)}
        />
      </div>
      {loader ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress color="success" />
          <Typography position="absolute">Loading Users</Typography>
        </Box>
      ) : (
        newUsers && (
          <BasicTable
            users={newUsers}
            editUserId={editUserId}
            editUserData={editUserData}
            handleEditClick={handleEditClick}
            handleEditUserChange={handleEditUserChange}
            handleEditFormSubmit={handleEditFormSubmit}
            handleCancelClick={handleCancelClick}
            handleDeleteClick={handleDeleteClick}
            checkBoxClicked={checkBoxClicked}
            handleDeleteButtonClick={handleDeleteButtonClick}
          />
        )
      )}
    </div>
  );
}

export default App;
