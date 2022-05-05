import React , { useState } from 'react';
import axios from 'axios';
import './SignIn.css';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth, useToastContext } from '../../context/index';


export function SignIn() {
  const navigate = useNavigate();
   const [email , setEmail] = useState();
   const [password , setPassword] = useState();
   const { setIsLogIn } = useUserAuth();  
   const notify  = useToastContext();

   const loginHandler = async(e) => {
     e.preventDefault();
     if(email && password){
      try {
        const response = await axios.post(`/api/auth/login`, {
          email , password
        });
        if(response.status === 200){
          localStorage.setItem("token", response.data.encodedToken);
          let getTokenFromLocalStorage = localStorage.getItem('token')
          if(getTokenFromLocalStorage){
            notify('You Are Successfully Login!',{type:'success'});
            setIsLogIn(true);
            navigate('/');
          }
        } 
      } catch (err) {
        notify("The email you entered is not Registered. Please SignUp!",{type:'warning'});
      }
     }else{
      notify('Enter Empty Fields',{type:'warning'});
     }

  }

  const guestLoginHandler = () => {
    setEmail('guest1234@gmail.com');
    setPassword('guest1234')
  }

  return (
    <>
    <div className="login-container">
        <h3 className="login-heading">Account Information</h3>
        <div className="login-card">
            <h2>LogIn</h2>
            <form className="logIn-form" onSubmit={loginHandler}>
                <label htmlFor='login-eamil-input' aria-required="true">E-mail address<span>*</span></label>
                <input type="email" name="user-email" id="login-eamil-input" value={email} onChange={e => setEmail(e.target.value)}/>

                <label htmlFor='login-password' aria-required="true">Password<span>*</span></label>
                <input type="password" name="login-password" id="login-password" value={password} onChange={e => setPassword(e.target.value)}/>

                <button className="forgot-password-link">Forgot your password?</button>

                <button className="login-btn" type="submit" onClick={loginHandler}> Login In </button>
            </form>
            <button className="login-btn" type="submit" onClick={guestLoginHandler}> Login as Guest </button>
            <h2>OR</h2>
            <button className="signIn-with-google-btn"><i className="lni lni-google"></i> <span className='signInWithGoogleBtnText'>Sign in with google</span></button>

            <p>I Don't Have An Account</p>
            <Link to='/sign-up'>CREATE AN ACCOUNT</Link>
        </div>
    </div>
    </>
  )
}