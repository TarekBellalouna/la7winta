import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import PageTitle from "../../components/Common/PageTitle";
import {
  disableUser,
  removeUser,
  updateRole,
  usersList,
  updateProfile
} from "../../redux/User/userAction";

import { Table, Button } from "react-bootstrap";

import logo from "./logo192.png";
import "./User.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function User({ match, history }) {
  const [status, setStatus] = useState(true);
  const [file, setFile] = useState()
  const [thumbnail, setThumbnail] = useState()
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [gender, setGender] = useState();
  const [newPassword, setNewPassword] = useState();
  


  const [userId, setUserId] = useState()

  const locationOptions=[{label:"Tunis",value:"Tunis"},{label:"Nabeul",value:"Nabeul"}]
  const { user, users, successDisable, profileUpdated} = useSelector(
    
    (state) => state.userReducer
  );
  const [location, setLocation] = useState(user.location);
  const [profilPicture, setProfilPicture] = useState(user.profile_picture)

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
 const updateProfileHandler = (id)=>{
 const form = new FormData();
 form.append("username",username) ;
 form.append("name",name);
 form.append("phone",phone);
 form.append("email",email);
 form.append("location",location);
 if(password)
{ form.append("old_Password",password);
 
 form.append("password",newPassword);}
 if(file)
form.append("image", file)
else
form.append("image", {path:user.profile_picture})
dispatch(updateProfile(id,form))
 

 }
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
   
    setLocation(user.location)
    setUsername(user.username) 
    setName(user.name)
    setPhone(user.phone)
    setEmail(user.email)
    console.log(file)
    console.log(location)
  }, [user ,profileUpdated]);
useEffect(() => {
  if(profileUpdated.status===200){
    toast.success("Profile Updated")

         window.location.reload()

//  setLocation(profileUpdated.data.user.location)
//     setUsername(profileUpdated.data.user.username) 
//     setName(profileUpdated.data.user.name)
//     setPhone(profileUpdated.data.user.phone)
//     setEmail(profileUpdated.data.user.email)
//     setProfilPicture(profileUpdated.data.user.email)
    
  }else{
    if(profileUpdated===209)
    toast.error("Current Password Incorrect")
  }

}, [profileUpdated])

  return (
    <div className="user_wrapper">
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>

<ToastContainer />
    
      <PageTitle title={user.name} />
      {user.profile_picture ? (
        <div>
          <img  alt="user" src={user.profile_picture} className="img-thumbnail user-img" width={350} height={350}/>
          <center>
          <div className="text-align-center mt-3">
            <div>
              <b style={{ color: "#707070" }}>Upload User Image</b>
            </div>
            <input type="file"  onChange={onChangeHandler} className="mt-3" />
          </div>
         </center>
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
        <form onSubmit={  (e)=>{
          e.preventDefault()
          updateProfileHandler(user._id)
         
        
         
        }}>
       
          <table className="table m-0">
            <tbody>
              <tr>
                <th scope="row">Username:</th>
                <td><input  type="text" defaultValue={user.username}  onChange={(e)=>setUsername(e.target.value)}/></td>
              </tr>
              <tr>
                <th scope="row">name:</th>
                <td><input  type="text" defaultValue={user.name}  onChange={(e)=>setName(e.target.value)}/></td>
              </tr>
              <tr>
                <th scope="row">Email:</th>
                <td><input  type="email" defaultValue={user.email}  onChange={(e)=>setEmail(e.target.value)}/></td>
              </tr>
              <tr>
                <th scope="row">Phone:</th>
                <td><input  type="tel" defaultValue={user.phone}  onChange={(e)=>setPhone(e.target.value)}/></td>
              </tr>
              <tr>
                <th scope="row">Location:</th>
                
                <td><Select defaultInputValue={location} defaultValue={location} options={locationOptions} onChange={(e)=>{setLocation(e.value)
    console.log(location)}}/></td>
              </tr>
              <tr>
                <th scope="row">Current Password</th>
                <td>
                  <div>
                    <input
                      type="password"
                      className=" bordure form-control input"
                      placeholder="Current password"
                      onChange={(e) => {
                        setPassword(e.target.value)
                      }
                      }
                    >
                    </input>
                  </div>
                </td>
                <th scope="row">New Password</th>
                <td>
                  <div>
                    <input
                      type="password"
                      className=" bordure form-control input"
                      placeholder="New Password"
                      onChange={(e) => {
                        setNewPassword(e.target.value)
                      }
                      }
                    >
                    </input>
                  </div>
                </td>
              </tr>
              <tr>
              <td>
                <input type="submit" value="Update Profile" /></td>
              </tr>
               
            </tbody>
          </table>
</form>

              
                <button      onClick={()=>{dispatch(removeUser(user._id))}}>Desactivate my account </button>
               
              
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
