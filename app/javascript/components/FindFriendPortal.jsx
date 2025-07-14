import React from "react";
import { useEffect,useState } from "react";
import style from "./FindFriendPortal.module.css"
import { Link } from "react-router-dom";


export default function FindFriendPortal(){
  const [searchBoxValue,setSearchBoxValue]=useState("")
  const [users,setUsers]=useState([])
  
  useEffect(()=>{
    getUsers()
  },[])

  function getUsers(){
    const token = document.querySelector('meta[name="csrf-token"]').content;
    const url=`api/friends/find/${searchBoxValue==""?"none":searchBoxValue}`
    fetch(url, {
      method: "GET",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if(response.ok){
        return response.json()
      }else{
        throw Error("Netowrk Error")
      }
    })
    .then((res)=>{
      setUsers(res.users)
    })
    .catch((error) => {
      console.log(error.message)
    });
  }

  function processRequest(userId,status){
    const token = document.querySelector('meta[name="csrf-token"]').content;
    let url=null;
    if(status==null){
      url=`api/friends/add/${userId}`
    }else if(status=="pending"){
      url=`api/friends/delete/${userId}`
    }
    else{
      return
    }
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (response.ok) {
        getUsers();
      }else{
        throw new Error("Network response was not ok.");
      }
    })
    .catch((error) => {
      console.log(error.message)
    });
  }


  return <div className={style.body}>
    <div className={style.header}><Link className={style.links} to="/">Profile</Link></div>
    <div className={style.searchPanel}><input value={searchBoxValue} onChange={(e)=>{setSearchBoxValue(e.target.value)}} className={style.searchBox} placeholder="Search..."></input><button onClick={getUsers} className={style.searchButton}>Search</button></div>
    <div className={style.list}>
      {
        users.length==0?"No users found":users.map((user)=>{
          return <div key={user.id} className={style.user}><h4 className={`${style.userText}`}>{user.email}</h4> <button onClick={()=>{processRequest(user.id,user.status)}} className={`${user.status==null?style.requestButton:user.status=="pending"?style.pendingButton:style.acceptedButton}`}>{user.status==null?"Send Request":user.status=="pending"?"Request Sent":"Friend"}</button></div>
       })
      }
      
    </div>
  </div>
}