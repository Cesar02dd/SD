import React from 'react'
import Payment from '../Components/Payment/Payment'
import Navbar from '../Components/Navbar/Navbar'
import "./Home.css";

const LoginPage = () => {
  return (
    <div className='main_container'> 
        <Navbar />
        <Payment />
    </div>
  )
}

export default LoginPage