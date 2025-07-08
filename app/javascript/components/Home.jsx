import React from "react"
import { useEffect } from "react"


export default function Home(){
  useEffect(()=>{
    fetch("/api/messages")
    .then((res)=>{
      return res.json()
    })
    .then((res)=>{
      console.log(res)
    })
  })
  return<h1>Home</h1>
}