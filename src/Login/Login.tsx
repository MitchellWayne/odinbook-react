import './Login.scss';
import React, { useState } from 'react';

import { Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // loginUser();
  }

  return (
    <div className="Login">
      <div className="loginContainer">

        <form className="loginAuthBox" id="authBox" onSubmit={handleSubmit}>
          <h2 className="formTitle">Odinbook</h2>
          <input value={username} onChange={e => setUsername(e.target.value)} name="username" className="loginAuthBoxInput loginEmail" id="loginEmail" placeholder="Email" type="email"/>
          <input value={password} onChange={e => setPassword(e.target.value)} name="password" className="loginAuthBoxInput loginPassword" placeholder="Password" type="password"/>
          {
            errors ?
            <div className="loginErrors">{errors}</div>
            :
            null
          }
          <input className="loginAuthBox__login" value="Log in" type="submit"/>
          <hr className="separator"></hr>
          <Link to="/signup" className="createAccount">Create an account</Link>
          {/* <button className="createAccount" onClick={testDrive}>Test Drive Existing Account</button> */}
        </form>

        <div className="loginTextLogo" id="textLogo">
          <h1 className="loginTitle">Odinbook</h1>
          <h2 className="loginSubtext">Just another social site</h2>
        </div>

      </div>
    </div>
  )
};

export default Login;