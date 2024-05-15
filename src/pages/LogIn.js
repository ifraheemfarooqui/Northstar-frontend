import React, { useState } from 'react';
import { Button, Card, CardContent, Input, Typography } from '@mui/material';
import "../components/Other.css";
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { BASEURL } from '../globles/base';



const LogIn = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onsumbit = () =>{

    if(!email || !password){
      toast.error(`All feilds are required`)
    }
    else{

      
          const data = {
            "email" : email,
            "password" : password
          }

          const url = `${BASEURL}/login`

          axios.post(url, data)
          .then((res) => {
            toast.success(`Welcome back ${res?.data?.fullname}`)
            setEmail ("")
            setPassword("")
            setTimeout(() => {
              navigate("/")
      
            },3000)
          })
          .catch((err) => {
            if(err?.response?.status == 401){
                toast.error(err?.response?.data);
            }
          });
  
  }}

  const cardStyle = {
    backgroundColor: "#242424",
    maxWidth: 400,
    textAlign: 'center',
    boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
    padding: "20px",
    color: "#fff",
    margin: "auto", 
  };

  const inputStyle = {
    paddingTop: "20px",
    marginBottom: '10px',
    width: "80%",
    color: "#fff",
  };

  

  return (
    <>
    <div><Toaster position="top-right" reverseOrder={false} toastOptions={{duration: 3000}}/></div>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={cardStyle}>
        <CardContent>
          <Typography>
            <h2>
              Log in to Exclusive
            </h2>
          </Typography>
          <Typography>
            <p>
              Enter your details below
            </p>
          </Typography>
          <Input
            style={inputStyle}
            type='Email'
            placeholder='Email or Phone Number'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            style={inputStyle}
            type='Password'
            placeholder='Password'
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='login-div'>
            <Button onClick={onsumbit} style={{ backgroundColor: "#fff", color: "#242424" }}>
              Log In
            </Button>
            <Link className='link-log'>Forget Password?</Link>
          </div>
        </CardContent>
      </Card>
    </div>
    </>
  )

}

export default LogIn;
