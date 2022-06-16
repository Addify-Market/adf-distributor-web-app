import React from 'react'
import Button from '@mui/material/Button';
// import useHook from "../../../hooks";

export default function Buttons({color, title}) {
  // const {toggleUser} = useHook();
  // const changeUserStatus = (e) => {
  //   e.preventDefault()
  //   console.log("hits");
  //   toggleUser(true, role)
  // }
  return (
    <Button variant="contained" style={{background:color, color:"#ffffff", fontWeight:"bold"}}>{title}</Button>
  )
}
