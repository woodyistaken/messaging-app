import React from "react"
import { useRef,useState } from "react";
import { Link } from "react-router-dom";
import style from './SignUpPortal.module.css'

export default function SignUpPortal(){
  const [email,setEmail]=useState("")
  const emailInput=useRef()
  const [password,setPassword]=useState("")
  const passwordInput=useRef()
  const [passwordConfirmation,setPasswordConfirmation]=useState("")
  const passwordConfirmationInput=useRef()
  const [errors,setErrors]=useState(null)
  function sendSignUp(){
    const token = document.querySelector('meta[name="csrf-token"]').content;
    const url="/users"
    const body={
      authenticity_token:token,
        user:{
          email:email,
          password:password,
          password_confirmation:passwordConfirmation,
          
        },
      commit:"Sign up"
    }
    
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    .then((response) => {
      if (response.ok) {
        window.location.href = '/'
      }else{
        throw new Error("Network response was not ok.");
      }
    })
    .catch((error) => {
      setErrors("Email is taken")
      console.log(error.message)
    });
  }
  function changeHandler(e,setter){
    setter(e.target.value)
  }
  function clickHandler(e){
    e.preventDefault()
    if(emailInput.current.validity.valueMissing){
      setErrors("Need to type in an email")
      return;
    }
    if(passwordInput.current.validity.valueMissing){
      setErrors("Need to type in a password")
      return;
    }
    if(passwordConfirmationInput.current.validity.valueMissing){
      setErrors("Need to type in a password confirmation")
      return;
    }
    if(!emailInput.current.checkValidity()){
      setErrors("Need @ in email")
      return;
    }
    if(!passwordInput.current.checkValidity()){
      setErrors("Password need to be 6 letters long")
      return;
    }
    if(password!==passwordConfirmation){
      setErrors("Passwords don't match")
      return;
    }
    setErrors("")
    sendSignUp() 
  }
  return (
  <div className={style.container}>
    <div className={style.textContainer}>
      <h2 className={style.header}>Sign up</h2>
      <div className={style.error}>{errors?"Error: "+errors:null}</div>
      <form action="" method="post" >
        <label htmlFor="email">Email</label><br></br>
        <input className={style.input} id="email" type="email" value={email} ref={emailInput} onChange={(e)=>changeHandler(e,setEmail)} required></input><br></br>
        <label htmlFor="password">Password (6 characters minimum)</label><br></br>
        <input className={style.input} id="password" type="password" value={password} ref={passwordInput} onChange={(e)=>changeHandler(e,setPassword)} minLength="6" required></input><br></br>
        <label htmlFor="password_confirmation">Password Confirmation</label><br></br>
        <input className={style.input} id="password_confirmation" type="password" value={passwordConfirmation} ref={passwordConfirmationInput} onChange={(e)=>changeHandler(e,setPasswordConfirmation)} required></input><br></br>
        <button className={style.button} onClick={clickHandler}>Sign Up</button>
        
      </form>
      <a href="/sign_in">Log in</a>
    </div>
    
  </div>
  )
}