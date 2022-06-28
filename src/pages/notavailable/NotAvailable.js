import React from 'react'
import notFoundBG from "../../assets/404.jpg"
import Button from '@mui/material/Button';
const NotAvailable = () => {
    console.clear()
  return (
   <div style={{width:"100%", height:"100vh", overflow:"hidden", backgroundRepeat:"no-repeat", backgroundImage:`url(${notFoundBG})`, backgroundSize:"contain"}}>
     <div style={{
       width:"50%", height:50, margin: "38% auto"
     }}>
      <Button variant="contained">Request Addon</Button>
     </div>
   </div>
  )
}

export default NotAvailable;