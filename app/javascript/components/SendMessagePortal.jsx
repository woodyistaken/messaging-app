import React from "react";
import { useState,useEffect } from "react";
import HeaderSub from './HeaderSub' 
import style from './SendMessagePortal.module.css'

export default function SendMessagePortal(){

  const [friends,setFriends]=useState([])
  const [message,setMessage]=useState("")
  const [to,setTo]=useState("-1")
  const [sent,setSent]=useState(false)


  useEffect(()=>{
    getFriends()
  },[])

  function getFriends(){
    fetch("/api/friends")
    .then((res)=>{
      return res.json()
    })
    .then((res)=>{
      setFriends(res.friends)
      setTo(res.friends[0].id)
    })
  }

  function sendMessage(){
    const token = document.querySelector('meta[name="csrf-token"]').content;
    const url="api/messages/send"
    const body={
      message:message,
      to:Number(to),
    }
    setMessage("")
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
        console.log(response)
        setSent(true)
        setTimeout(()=>{setSent(false)},1000)
      }else{

        throw new Error("Network response was not ok.");
      }
    })
    .catch((error) => {
      setErrors("Invalid User")
      console.log(error.message)
    });
  }

  return (<div className={style.body}>
    <HeaderSub/>
    <div className={style.container}>
      <form className={style.form}> 
        <div className={style.selectBox}>
          <label htmlFor="friendSelect">To:</label>
          <select id="friendSelect"className={style.select} value={to} onChange={(e)=>{setTo(e.target.value)}}>
            {friends.map((friend)=>{
              return <option key={friend.id} value={friend.id}>{friend.email}</option>
            })}
          </select>
        </div>
        <div className={style.messageBox}>
          <label htmlFor="message">Message:</label><br></br>
          <textarea className={style.message} id="message" value={message} onChange={(e)=>{setMessage(e.target.value)}}></textarea>
        </div>
        <button type="button" className={style.sendButton} onClick={sendMessage}>{sent?"Message Sent":"Send"}</button>
      </form>
    </div>
    
  </div>)
}