import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../../redux/User/userAction";
import history from "../../history.js";

function RegisterArea({ history, location }) {
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [gender, setGender] = useState();
  const [isAdmin, setIsAdmin] = useState();

  const [passwordShown, setPasswordShown] = useState(false);
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const handleRegistration = (e) => {
    e.preventDefault();
    dispatch(register(username, name, gender, phone, email, password, isAdmin));
    // history.push("/profile");
  };

  // const { user } = useSelector((state) => state.userReducer);
  // console.log("user", user);

  // const redirect = location.search ? location.search.split("=")[1] : "/profile";

  // useEffect(() => {
  //   if (user) {
  //     history.push(redirect);
  //   }
  // }, []);

  return (
    <div className="register-form">
      {message &&
        (Array.isArray(message) ? (
          <div className="alert alert-danger" role="alert">
            <ul className="errors" style={{ marginBottom: 0 }}>
              {message.map((msg) => (
                <li key={msg} className="error">
                  {msg}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className={`alert alert-success`} role="alert">
            {message}
          </div>
        ))}
      <h2>Register</h2>
      <form onSubmit={handleRegistration}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Full Name "
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type={passwordShown ? "text" : "password"}
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group" class="radioflex">
          <label for="gender" class="text-light">
            {" "}
            Gender
          </label>
          <div class="radio-inline">
            <input type="radio" id="radio-2" name="gender" value="male"></input>
            <label for="gender" class="radio-label">
              {" "}
              male
            </label>
          </div>
          <div class="radio-inline">
            <input type="radio" name="gender" value="female"></input>
            <label for="gender" class="radio-label">
              {" "}
              female
            </label>
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="checkme"
                onChange={() => setPasswordShown(!passwordShown)}
              />
              <label className="form-check-label" htmlFor="checkme">
                Show password?
              </label>
            </div>
          </div>
        </div>

        <button type="submit">Register now</button>
      </form>

      <div className="important-text">
        <p>
          Already have an account? <Link to="/login">Login now!</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterArea;
