import React from "react";
import style from './HeaderSub.module.css'
import { Link } from "react-router-dom";

export default function HeaderSub(){
  return <div className={style.header}><Link className={style.links} to="/">Profile</Link></div>
}