import React, { useRef, useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";

import AuthContext from "../../contexts/auth-context";

function LoginArea({ customClass = "", history }) {
  const email = useRef();
  const password = useRef();
  const [alertMsg, setAlertMsg] = useState(null);
  const context = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.current.value,
        password: password.current.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.id) {
          email.current.value = "";
          password.current.value = "";
          context.login(res.token, res.id, res.tokenExpiration);
          localStorage.setItem("token", JSON.stringify(res.token));
          localStorage.setItem("userId", JSON.stringify(res.id));
          localStorage.setItem(
            "tokenExpiration",
            JSON.stringify(res.tokenExpiration)
          );
          history.push("/");
        } else if (res.error) {
          setAlertMsg(res.error);
        } else if (res.errors) {
          let errors = Object.values(res.errors);
          setAlertMsg(errors);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={"login-form" + customClass}>
      {alertMsg &&
        (Array.isArray(alertMsg) ? (
          <div className="alert alert-danger" role="alert">
            <ul className="errors" style={{ marginBottom: 0 }}>
              {alertMsg.map((msg) => (
                <li key={msg} className="error">
                  {msg}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className={`alert alert-success`} role="alert">
            {alertMsg}
          </div>
        ))}
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            ref={email}
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            ref={password}
          />
        </div>

        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="checkme"
              />
              <label className="form-check-label" htmlFor="checkme">
                Remember me
              </label>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-6 lost-your-password">
            <a href="#" className="lost-your-password">
              Forgot your password?
            </a>
          </div>
        </div>

        <button type="submit">Login</button>
      </form>

      <div className="important-text">
        <p>
          Don't have an account? <Link to="/register">Register now!</Link>
        </p>
      </div>
    </div>
  );
}

export default withRouter(LoginArea);
