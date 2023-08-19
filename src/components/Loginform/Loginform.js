import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Loginform.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Loginform = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const { login, setReload, reload } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleEmailChange = (event) => {
    const inputValue = event.target.value;
    setEmail(inputValue);

    if (!isEmailFocused) {
      if (inputValue.trim() === '') {
        setEmailError(false);
      } else {
        setEmailError(!isValidEmail(inputValue));
      }
    }
  };

  const handlePasswordChange = (event) => {
    const inputValue = event.target.value;
    setPassword(inputValue);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const handleSubmitLogin = async () => {
    if (!isValidEmail(email)) {
      console.log('Email incorrecto');
      return;
    }

    try {

      const userName = await login(password, email);
      setReload(!reload)
      navigate(`/user/${userName}`)


    } catch (error) {
      console.log('Error al iniciar sesión:', error);
      console.log('pruebas de error', error.response.data)
      toast.error(error.response.data.error, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      })

    }
  };

  const handleEmailFocus = () => {
    setIsEmailFocused(true);
  };

  const handleEmailBlur = () => {
    setIsEmailFocused(false);

    if (email.trim() === '') {
      setEmailError(false);
    } else {
      setEmailError(!isValidEmail(email));
    }
  };

  const [userName, setUserName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerEmailError, setRegisterEmailError] = useState(false);
  const [isRegisterEmailFocused, setIsRegisterEmailFocused] = useState(false);

  const handleRegisterEmailChange = (event) => {
    const inputValue = event.target.value;
    setRegisterEmail(inputValue);

    if (!isRegisterEmailFocused) {
      if (inputValue.trim() === '') {
        setRegisterEmailError(false);
      } else {
        setRegisterEmailError(!isValidEmail(inputValue));
      }
    }
  };

  const handleRegisterEmailFocus = () => {
    setIsRegisterEmailFocused(true);
  };

  const handleRegisterEmailBlur = () => {
    setIsRegisterEmailFocused(false);

    if (registerEmail.trim() === '') {
      setRegisterEmailError(false);
    } else {
      setRegisterEmailError(!isValidEmail(registerEmail));
    }
  };

  const handleUserNameChange = (event) => {
    const inputValue = event.target.value;
    setUserName(inputValue);
  };

  const handleRegisterPasswordChange = (event) => {
    const inputValue = event.target.value;
    setRegisterPassword(inputValue);
  };

  const handleSubmitRegister = async (event) => {
    event.preventDefault();
    if (registerEmailError) {
      return;
    }
    const newUser = {
      userName: userName,
      email: registerEmail,
      password: registerPassword,
    };

    try {
      await axios.post("http://localhost:3001/users/", newUser);
      await login(newUser.password, newUser.email);
      navigate(`/user/${userName}`);
    } catch (error) {
      console.log("Error al registrarme:", error);
      toast.error(error.response.data.error, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      })
    }

  }

  return (
    <div className="section">
      <div className="container">
        <div className="row full-height justify-content-center">
          <div className="col-12 text-center align-self-center py-5">
            <div className="section pb-5 pt-5 pt-sm-2 text-center">
              <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
              <label htmlFor="reg-log"></label>
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">
                  <div className="card-front">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Log In</h4>
                        <div className="form-group">
                          {emailError && <p className="error-message">Email incorrecto</p>}
                          <input
                            className={`form-style ${emailError ? 'error-input' : ''}`}
                            placeholder='Email'
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={handleEmailChange}
                            onFocus={handleEmailFocus}
                            onBlur={handleEmailBlur}
                          />
                          <i className="input-icon uil uil-at"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input
                            className="form-style"
                            placeholder="Password"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={handlePasswordChange}
                          />
                          <i className="input-icon uil uil-lock-alt"></i>
                        </div>
                        <button
                          type="submit"
                          className="btn mt-4"
                          onClick={handleSubmitLogin}
                        >
                          Login
                        </button>
                        <p className="mb-0 mt-4 text-center">
                          <button
                            onClick={() => {
                              navigate(`/ForgotPassword`);
                            }}
                          >Forgot your password?</button>
                        </p>

                      </div>
                    </div>
                  </div>
                  <div className="card-back">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-3 pb-3">Sign Up</h4>
                        <div className="form-group">
                          {registerEmailError && (
                            <p className="error-message">Email incorrecto</p>
                          )}
                          <input
                            type="text"
                            className="form-style"
                            placeholder="User Name"
                            value={userName}
                            onChange={handleUserNameChange}
                          />
                          <i className="input-icon uil uil-user"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="email"
                            className={`form-style ${registerEmailError ? "error-input" : ""}`}
                            placeholder="Email"
                            required
                            fullWidth
                            name="email"
                            autoComplete="email"
                            value={registerEmail}
                            onChange={handleRegisterEmailChange}
                            onFocus={handleRegisterEmailFocus}
                            onBlur={handleRegisterEmailBlur}
                          />
                          <i className="input-icon uil uil-at"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="password"
                            className="form-style"
                            placeholder="Password"
                            value={registerPassword}
                            onChange={handleRegisterPasswordChange}
                          />
                          <i className="input-icon uil uil-lock-alt"></i>
                        </div>
                        <button
                          type="submit"
                          className="btn mt-4"
                          onClick={handleSubmitRegister}
                        >
                          Register
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div >
  );
};

export default Loginform;
