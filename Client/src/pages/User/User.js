import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PageTitle from "../../components/Common/PageTitle";
import {
  disableUser,
  removeUser,
  updateRole,
  usersList,
} from "../../redux/User/userAction";

import { Table, Button } from "react-bootstrap";

import logo from "./logo192.png";
import "./User.css";
import axios from "axios";
function User({ match, history }) {
  const [status, setStatus] = useState(true);
  const [file, setFile] = useState()
  const [thumbnail, setThumbnail] = useState()
  const [userId, setUserId] = useState()
  const { user, users, successDisable, } = useSelector(
    (state) => state.userReducer
  );

  // console.log("user profile", user.name);

  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(removeUser(id));
    }
  };

  const disableHandler = (e) => {
    if (window.confirm("Are you sure")) {
      e.preventDefault();
      disableUser({ id: userId, status });
      console.log("heyy!");
    }
  };

  const editHandler = (id) => {
    // if (window.confirm('Are you sure')) {
    //   dispatch(deleteUser(id))
    // }
  };

  const onChangeHandler = (event) => {
    setThumbnail(null)
    console.log("first", event.target.files[0])
    setFile(event.target.files[0])
    var reader = new FileReader();
    reader.onload = function (e) {
      setThumbnail(e.target.result)
    }
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const UpdateProfileHandler = (e) => {
    setUserId(user._id)
    // e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("userId", userId);
    // const data = file
    axios.post("/upload", data)
      .then((res) => {
        console.log("res", res)
        const data = {
          userId: userId,
          type: file.type
        }
        axios.post('/user/update', data)
          .then(response => {
            if ((response.statusText) === "OK") {
              console.log("response", response)
            }
          })
          .catch((error) => {
            //
          });
      })
      .catch((error) => {
        //
      });
  }

  // const updateList = (id, items) => {
  //   console.log('items', items)
  //   axios.put('/user/role/' + id, items)
  //     .then(res => {
  //       console.log('res', res)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  const handleEditRole = (e) => {
    console.log("before", user.role);
    user.role = e.target.value;
    const userRole = user.role;
    console.log("after", user.role);
    dispatch(updateRole({ id: user._id, role: userRole }))
  }


  useEffect(() => {
    if (user.isAdmin) {
      dispatch(usersList());
    }
  }, []);

  return (
    <div className="user_wrapper">
      <PageTitle title={user.name} />
      {user.image ? (
        <div>
          <img src="" alt="user" class="img-thumbnail user-img" />
        </div>
      ) : (
        <center>
          <div className="text-align-center mt-3">
            <div>
              <b style={{ color: "#707070" }}>Upload User Image</b>
            </div>
            <input type="file" onChange={onChangeHandler} className="mt-3" />
          </div>
          <button variant='primary' onClick={UpdateProfileHandler}>Upload Image</button>
        </center>
      )}

      <div className="user-area-wrap mt-4 mb-4 container">
        <h4 className="user-header">User Profile</h4>

        <div className="user-info">
          <table className="table m-0">
            <tbody>
              <tr>
                <th scope="row">Username:</th>
                <td>{user.username}</td>
              </tr>
              <tr>
                <th scope="row">Email:</th>
                <td>{user.email}</td>
              </tr>
              <tr>
                <th scope="row">Phone:</th>
                <td>{user.phone}</td>
              </tr>
              <tr>
                <th scope="row">Role:</th>
                <td>
                  <div>
                    <input
                      type="text"
                      className=" bordure form-control input"
                      defaultValue={user.role}
                      onChange={(e) => {
                        handleEditRole(e);
                      }
                      }
                    >
                    </input>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {user.role === "user" &&
            (user.orders.length <= 0 ? (
              <p>
                <span className="user-border">No orders </span>
              </p>
            ) : (
              user.orders.map((order) => {
                return <li key={order}>{order}</li>;
              })
            ))}
        </div>
      </div>

      {
        user.isAdmin ?
          <>
            <div className="container page-title-content p-3">
              <h3>List of users :</h3>
            </div>

            <Table
              striped
              bordered
              hover
              responsive
              className="table-sm user-area-wrap ptb-100 container"
            >
              <thead>
                <tr className="user-header">
                  <th>Name</th>
                  <th>Email</th>
                  <th>Delete</th>
                  <th>Disable</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                {users ? (
                  users.map((users) => (
                    <tr key={users._id}>
                      <td>{users.name}</td>
                      <td>{users.email}</td>
                      <td>
                        <Button
                          variant="btn-default"
                          className="btn-sm"
                          onClick={() => deleteHandler(users._id)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant=""
                          className="btn-sm"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          onClick={disableHandler}
                        // onChange={() => disableHandler(users._id, users.status)}
                        >
                          <i className="fas fa-ban"></i>
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <h1>No Users</h1>
                )}
              </tbody>
            </Table>
          </>
          : null}
    </div>
  );
}

export default User;
