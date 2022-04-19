import React, { useRef, useState, useContext, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/User/userAction.js'

import AuthContext from "../../contexts/auth-context";
import { GoogleLogin } from 'react-google-login';
 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function LoginArea({ customClass = "", history, location }) {
  //login google
  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem('loginData'))
      : null
  );
  const handleLogoutG = () => {
    localStorage.removeItem('loginData');
    setLoginData(null);
  };
  ///////
const responseGoogle = (response) => {
  console.log(response);
}
///
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [alertMsg, setAlertMsg] = useState(null);
  // const context = useContext(AuthContext);

  const dispatch = useDispatch()

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(login(email, password))


  }

  const { user,loginError } = useSelector(state => state.userReducer)
  console.log("user", user)
  console.log("error", loginError)

  const redirect = location.search ? location.search.split('=')[1] : '/profile'
///google login
const handleFailureG = (result) => {
   
};

const handleLoginG = async (googleData) => {
  const res = await fetch('/api/google-login', {
    method: 'POST',
    body: JSON.stringify({
      token: googleData.tokenId,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();
  setLoginData(data);
  localStorage.setItem('loginData', JSON.stringify(data));
};
 
useEffect(() => {
  toast.error(loginError)

  
}, [loginError])


/////////
  useEffect(() => {
    if (user) {
      // history.push("/profile")
    }
  }, [user, history])

  return (
    <div className={"login-form" + customClass}>
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
            <a href="/forget-password" className="lost-your-password">
              Forgot your password?
            </a>
          </div>
        </div>

        <button type="submit" >Login</button>
      </form>

      <div className="important-text">
        <p>
          Don't have an account? <Link to="/register">Register now!</Link>
        </p>
      </div>
      <header className="App-header"> 
         
        <div>
          {loginData ? (
            <div>
              <h3>You logged in as {loginData.email}</h3>
              <button onClick={handleLogoutG}>Logout</button>
            </div>
          ) : (
          
            <GoogleLogin
              clientId={"56271678244-v9rvg0o04elruve44g90qdn20ee7f4ph.apps.googleusercontent.com"}
              buttonText="Log in with Google"
              onSuccess={handleLoginG}
              onFailure={handleFailureG}
              cookiePolicy={'single_host_origin'}
            ></GoogleLogin>
          )}
        </div>
      </header>
;
    </div>
  );
}

export default withRouter(LoginArea);
