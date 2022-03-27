import React, { useRef, useState, useContext, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/User/userAction.js'

import AuthContext from "../../contexts/auth-context";

function LoginArea({ customClass = "", history, location }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [alertMsg, setAlertMsg] = useState(null);
  // const context = useContext(AuthContext);

  const dispatch = useDispatch()

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  const { user } = useSelector(state => state.userReducer)
  console.log("user", user)

  const redirect = location.search ? location.search.split('=')[1] : '/profile'

  useEffect(() => {
    if (user) {
      history.push(redirect)
    }
  }, [user, history, redirect])

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
