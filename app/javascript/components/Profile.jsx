import React from "react"
import { useEffect,useState } from "react"
import { Link } from "react-router-dom"
import style from './Profile.module.css'

export default function Profile(){

  const [user,setUser]=useState("")
  const [sentChosen,setSentChosen]=useState(false)
  const [messages,setMessages]=useState([])
  const [openMessage,setOpenMessage]=useState(null)
  const [friends,setFriends]=useState([])

  useEffect(()=>{
    fetch("/api/messages")
    .then((res)=>{
      return res.json()
    })
    .then((res)=>{
      if(res.user===null){
        console.log(res.user)
        window.location.href = '/sign_in'
      }
      setUser(res.user)
    }).catch((error)=>{
      console.log(error)
    })
  },[])

  useEffect(()=>{
    if(sentChosen){
      fetch("/api/messages/sent")
      .then((res)=>{
        return res.json()
      })
      .then((res)=>{
        setMessages(res.messages)
      })
    }else{
      fetch("/api/messages/received")
      .then((res)=>{
        return res.json()
      })
      .then((res)=>{
        setMessages(res.messages)
      })
    }
    
  },[sentChosen])

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
    })
  }
  function signOut(e){
    e.preventDefault()
    const url="/users/sign_out"
    const token = document.querySelector('meta[name="csrf-token"]').content;
    const body={
      authenticity_token:token,
    }
    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      credentials: "include"
    })
    .then((response) => {
      if (response.ok) {
        setUser(null);
        window.location.href = '/sign_in'
      }
      throw new Error("Network response was not ok.");
    })
  }
  function editUser(e){
    e.preventDefault()
    window.location.href = '/edit'
  }
  function toggleSent(option){
    setSentChosen(option)
  }
  function displayMessage(message){
    setOpenMessage(message)
  }
  function MessageDialog(){
    return (
      <div onClick={closeMessageDialog} className={style.dialogBackdrop}>
        <div className={style.messageDialog} onClick={(e)=>{
          e.stopPropagation();
        }}>
          <div className={style.messageDialogHeader}><button onClick={closeMessageDialog} type="button">X</button></div>
          <h4>{openMessage.message}</h4>
          <p>{openMessage.to!==undefined?`To: ${openMessage.to}`:`From: ${openMessage.from}`}</p>
        </div>
      </div>
    )
    _
  }
  function closeMessageDialog(event){
    event.stopPropagation();
    event.preventDefault();
    setOpenMessage(null)
  }
  function removeFriend(friendId){
    const token = document.querySelector('meta[name="csrf-token"]').content;
    const url=`api/friends/delete/${friendId}`
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
    let newFriends=[]
    for(let i=0; i<friends.length;i++){
      if(friends[i].id!=friendId){
        newFriends.push(friends[i])
      }
    }
    setFriends(newFriends)
  }
  function acceptFriend(friendId){
    const token = document.querySelector('meta[name="csrf-token"]').content;
    const url=`api/friends/accept/${friendId}`
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    }).then((res)=>{
      getFriends()
    })
  }

  return(<div className={style.container}>
    <div className={style.header}>
      <h1 className={style.greeting}>Hello, {user}</h1>
      <Link className={style.links} to="findFriends"> Find Friends</Link>
      <Link className={style.links} to="send">Send Message</Link>
      <a className={style.links} onClick={editUser} href="">Edit User</a>
      <a className={style.links} onClick={signOut} href="">Sign out</a>
    </div>
    <div className={style.content}>
      <div className={style.messagesContainer}>
        <h1 className={style.messageTitle}>Messages</h1>
        <div className={style.messagesDashboard}>
          <div className={style.messageButtons}>
            <button type="button" className={`${style.messageBtn} ${sentChosen?"":style.activatedBtn}`} onClick={()=>toggleSent(false)}>Received Messages</button>
            <button type="button" className={`${style.messageBtn} ${sentChosen?style.activatedBtn:""}`} onClick={()=>toggleSent(true)}>Sent Messages</button>
          </div>
          <div className={style.messages}>
            {messages.map((message)=>{
              return <div key={message.id} className={style.message} onClick={()=>{displayMessage(message)}}><h4 className={style.messageText}>{message.message}</h4> <p className={style.messagePerson}>{message.to!==undefined?`To: ${message.to}`:`From: ${message.from}`}</p></div>
            })}
          </div>
        </div>
      </div>
      <div className={style.friendsContainer}>
        <h1>Friends</h1>
        <div className={style.friends}>
          {friends.map((friend)=>{
              return <div key={friend.id} className={style.friend}><h4 className={style.FriendText}>{friend.email}</h4> <button onClick={friend.status=="pending"?()=>acceptFriend(friend.id):()=>removeFriend(friend.id)} className={friend.status=="pending"?style.acceptButton:style.unfriendButton}>{friend.status=="pending"?"Accept":"Unfriend"}</button></div>
          })}
        </div>
      </div>
    </div>
    {openMessage? <MessageDialog/>:null }
  </div>)
}