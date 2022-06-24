import React , { useState } from 'react';
import axios from 'axios';
import './SignIn.css';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth, useToastContext } from '../../context/index';
import { Navbar } from '../../components';


export function SignIn() {
  const navigate = useNavigate();
   const [email , setEmail] = useState('');
   const [password , setPassword] = useState('');
   const { setIsLogIn } = useUserAuth();  
   const notify  = useToastContext();
   const [showPassword , setShowPassword] = useState(false); 
   const [hidePassword , setHidepassword] = useState(false); 

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
      setShowPassword(true);
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
    <Navbar searchBar={false} />
        <h3 className="login-heading">Account Information</h3>
        <div className="login-card">
            <h2>LogIn</h2>
            <form className="logIn-form" onSubmit={loginHandler}>
            <label htmlFor='login-eamil-input' aria-required="true">E-mail address<span>*</span></label>
                <input type="email" placeholder='johncena@gmail.com' name="user-email" required id="login-eamil-input" value={email} onChange={ event => setEmail(event.target.value)}/>
                {showPassword && email.length<=0
                ? <p className="error-notice">Email Can't be Empty!</p>
                :''}

                <label htmlFor="login-password" aria-required="true">Password<span>*</span></label>
                <input className='password-input' type={hidePassword ? "password" : 'text'} placeholder='********' name="login-password" required id="login-password" value={password} onChange={ event => setPassword(event.target.value)}/>
                {showPassword && password.length<=0
                ? <p className="error-notice">Password Can't be Empty!</p>
                :''} 
                <i className={ hidePassword ? 'bi bi-eye-slash eye-icon' : 'bi bi-eye eye-icon'} id="togglePassword" onClick={() => setHidepassword(prev => !prev)}></i>


                <button className="login-btn" type="submit" onClick={loginHandler}> Login In </button>
            </form>
            <button className="login-btn" type="submit" onClick={guestLoginHandler}> Login as Guest </button>
            <p>I Don't Have An Account</p>
            <Link to='/sign-up'>CREATE AN ACCOUNT</Link>
        </div>
    </div>
    </>
  )
}
