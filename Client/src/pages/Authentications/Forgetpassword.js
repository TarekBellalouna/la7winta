import { set } from "mongoose";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

//actions
import { passwordReset } from "../../redux/ResetPassword/PasswordAction";

const ForgetPassword =  () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.PasswordReducer);
  console.log("pass", message);

  const [data, setData] = useState({
    email: "",
  });

  const HandleSubmit =async() =>{
      if(data.email!==""){
        const response = await axios.post('http://localhost:5000/user/forget-password', data)
      .then(res =>{
        console.log(res)
        alert('Email sent')
      })
      .catch(error => {
          console.error('There was an error!', error);
      });
        
      }
      else{

      }
  }

  return (
    <>
      <section className="login-area ptb-50">
        <div className="container">
          <div className="login-form">
            {message ? (
              <div className={`alert alert-success`} role="alert">
                {message}
              </div>
            ) : null}

            <h2>Forget Password</h2>

           
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  onChange={(e) => setData({...data,email:e.target.value})}
                />
              </div>
              <button onClick={HandleSubmit}>Send Email</button>
            
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgetPassword;
