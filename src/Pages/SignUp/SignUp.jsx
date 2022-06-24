import './SignUp.css';
import React , { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserAuth, useToastContext } from '../../context/index';
import { Navbar } from '../../components';


export function SignUp() {
  const [name , setName] = useState('');
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [lastName , setLastName] = useState('');
  const navigate = useNavigate();
  const {setIsLogIn } = useUserAuth();
  const notify = useToastContext();
  const [showPassword , setShowPassword] = useState(false); 

  const signupHandler = async (e) => {
    e.preventDefault();
    if(name && lastName && email && password){
      try {
        const response = await axios.post(`/api/auth/signup`, ({
          firstName: name,
          lastName: lastName,
          email: email,
          password: password,
        }));
        // saving the encodedToken in the localStorage
        if(response.status === 201){
        localStorage.setItem("token", response.data.encodedToken);
        let getTokenFromLocalStorage = localStorage.getItem('token')
        if(getTokenFromLocalStorage){
          notify('You Are Successfully Signup!',{type:'success'});
          setIsLogIn(true);
          navigate('/');
        }
        }
      } catch (err) {
        console.error(err);
      }
    }else{
      notify('Enter Empty Fields',{type:'warning'});
    }
  }
  return (
    <>
    <div className="login-container">
    <Navbar searchBar={false} />
        <h3 className='login-container-heading'>Account Information</h3>
        <div className="login-card">
            <h2>Sign Up</h2>
            <form className="logIn-form">
                <label htmlFor="first-name" aria-required="true">First Name<span>*</span></label>
                <input type="text" placeholder='John' name="first-name" required id="first-name" value={name} onChange={ event => setName(event.target.value)}/>

                <label htmlFor="last-name" aria-required="true"> Last Name<span>*</span></label>
                <input type="text" placeholder='Cena' name="last-name" required id="last-name" value={lastName} onChange={ event => setLastName(event.target.value)}/>

                <label htmlFor='login-eamil-input' aria-required="true">E-mail address<span>*</span></label>
                <input type="email" placeholder='johncena@gmail.com' name="user-email" required id="login-eamil-input" value={email} onChange={ event => setEmail(event.target.value)}/>

                <label htmlFor="login-password" aria-required="true">Password<span>*</span></label>
                <input className='passwordInput' type={showPassword ? "password" : 'text'} placeholder='********' name="login-password" required id="login-password" value={password} onChange={ event => setPassword(event.target.value)}/> 
                <i className={ showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'} id="togglePassword" onClick={() => setShowPassword(prev => !prev)}></i>
                

                <button className="login-btn" type="submit" onClick={(event) => signupHandler(event)}> Sign Up </button>
            </form>
            <Link to="/login">Already have an Account?</Link>
        </div>
    </div>
    </>
  )
}

