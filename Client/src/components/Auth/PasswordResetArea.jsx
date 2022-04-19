import { set } from "mongoose";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useParams} from "react-router";
//actions
import { passwordReset } from "../../redux/ResetPassword/PasswordAction";

const PasswordResetArea = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.PasswordReducer);
  
  const params = useParams();
  const [formData, setFormData] = useState({
    user_id: params.id,
    password1: "",
    password2: "",
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if((formData.password1===formData.password2)&&(formData.password1!=="")&&(formData.password2!=="")){
      dispatch(passwordReset({ ...formData }));

      setFormData({
        user_id: params.id,
        password1: "",
        password2: "",
      });
    }
    else{
      alert("Password Invalide!")
    }
    

  };

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

            <h2>Password Reset</h2>

            <form onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password1"
                  value = {formData.password1}
                  onChange={(e) => onChange(e)}
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="repeat Password"
                  value={formData.password2}
                  name="password2"
                  onChange={(e) => onChange(e)}
                />
              </div>

              <button type="submit">Reset Password</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default PasswordResetArea;
