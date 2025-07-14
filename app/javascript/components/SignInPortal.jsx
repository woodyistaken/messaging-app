import React from "react"
import { useRef,useState } from "react";
import { Link } from "react-router-dom";
import style from './SignInPortal.module.css'

export default function SignUpPortal(){
  const [email,setEmail]=useState("")
  const emailInput=useRef()
  const [password,setPassword]=useState("")
  const passwordInput=useRef()
  const [errors,setErrors]=useState(null)
  function sendSignUp(){
    const token = document.querySelector('meta[name="csrf-token"]').content;
    const url="/users/sign_in"
    const body={
      authenticity_token:token,
        user:{
          email:email,
          password:password,
          remember_me:0
        },
      commit:"Log in"
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
      setErrors("Invalid User")
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
    if(!emailInput.current.checkValidity()){
      setErrors("Need @ in email")
      return;
    }
    setErrors("")
    sendSignUp() 
  }
  return (
  <div className={style.container}>
    <div className={style.textContainer}>
      <h2 className={style.header}>Log in</h2>
      <div className={style.error}>{errors?"Error: "+errors:null}</div>
      <form action="" method="post" >
        <label htmlFor="email">Email</label><br></br>
        <input className={style.input} id="email" type="email" value={email} ref={emailInput} onChange={(e)=>changeHandler(e,setEmail)} required></input><br></br>
        <label htmlFor="password">Password</label><br></br>
        <input className={style.input} id="password" type="password" value={password} ref={passwordInput} onChange={(e)=>changeHandler(e,setPassword)} required></input><br></br>
        <button className={style.button} onClick={clickHandler}>Log in</button>
        
      </form>
      <a href="/sign_up">Sign up</a>
    </div>
    
  </div>
  )
}