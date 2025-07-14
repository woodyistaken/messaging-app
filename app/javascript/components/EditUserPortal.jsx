import React from "react"
import { useRef,useState } from "react";
import { Link } from "react-router-dom";
import style from './EditUserPortal.module.css'

export default function SignUpPortal(){
  const [email,setEmail]=useState("")
  const emailInput=useRef()
  const [password,setPassword]=useState("")
  const passwordInput=useRef()
  const [passwordConfirmation,setPasswordConfirmation]=useState("")
  const passwordConfirmationInput=useRef()
  const [errors,setErrors]=useState(null)
  const [currentPassword,setCurrentPassword]=useState("")
  const currentPasswordInput=useRef()
  function sendEdit(){
    const url="/users"
    const body={
        user:{
          email:email,
          password:password,
          password_confirmation:passwordConfirmation,
          current_password:currentPassword
        },
      commit:"Update"
    }
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "PUT",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    .then((response) => {
      if (response.ok) {
        return response.json()
      }else{
        throw new Error("Network response was not ok.");
      }
    })
    .then((res)=>{
      if(res.invalidEmail){
        setErrors("Email is taken")
      }
    })
    .catch((error) => {
      if(error.message==="Network response was not ok."){
        setErrors("Invalid Password")
      }else{
        window.location.href = '/'
      }
      console.log(error)
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
    if(currentPasswordInput.current.validity.valueMissing){
      setErrors("Need to type in current password")
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
    sendEdit() 
  }
  return (
  <div className={style.container}>
    <div className={style.textContainer}>
      <h2 className={style.header}>Edit User</h2>
      <div className={style.error}>{errors?"Error: "+errors:null}</div>
      <form action="" method="post" >
        <label htmlFor="email">Email</label><br></br>
        <input className={style.input} id="email" type="email" value={email} ref={emailInput} onChange={(e)=>changeHandler(e,setEmail)} required></input><br></br>
        <label htmlFor="password">Password (<em>leave blank if you don't want to change it</em>)</label><br></br>
        <input  id="password" type="password" value={password} ref={passwordInput} onChange={(e)=>changeHandler(e,setPassword)} minLength="6"></input><br></br>
        <p className={`${style.paragraph} `}><em> 6 characters minimum</em></p>
        <label htmlFor="password_confirmation">Password Confirmation</label><br></br>
        <input className={style.input} id="password_confirmation" type="password" value={passwordConfirmation} ref={passwordConfirmationInput} onChange={(e)=>changeHandler(e,setPasswordConfirmation)}></input><br></br>
        <label htmlFor="current_password">Current Password (<em>we need your current password to confirm your changes</em>)</label><br></br>
        <input className={style.input} id="current_password" type="password" value={currentPassword} ref={currentPasswordInput} onChange={(e)=>changeHandler(e,setCurrentPassword)} required></input><br></br>
        <button className={style.button} onClick={clickHandler}>Update</button>
        
      </form>
      <Link to="/">Back</Link>
    </div>
    
  </div>
  )
}