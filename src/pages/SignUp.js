import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, FormControlLabel, Input, Radio, RadioGroup, Typography, duration } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google';
import "../components/Other.css";
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';

import {BASEURL} from "../globles/base"


const SignUp = () => {
        const navigate = useNavigate();

        const [name, setName] = useState('');
        const [phonenum, setPhoneNum] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [gender, setGender] = useState(''); // State to manage the selected gender

        const handleGenderChange = (event) => {
          setGender(event.target.value);
        };

        const onsumbit = () => {

            if(!name || !email || !password || !phonenum || !gender){
                toast.error("All feilds are required.");
            }else{
                const data = {
                    fullname: name,
                    email: email,
                    password: password,
                    contact: phonenum,
                    gender: gender,
                    account: "buyer"
                }
    
                const url = `${BASEURL}/register`
                
                axios.post(url, data)
                .then((res) => {
                    console.log(res);
                    toast.success(`Welcome ${res?.data?.fullname}! Account Created Successfully.`);
                    setName('');
                    setEmail('');
                    setPassword('');
                    setPhoneNum('');
                    setGender('');
                    // setTimeout(() => {
                    //     navigate("/")
                    // },3000);
                })
                .catch((err) => {
                    if(err?.response?.status == 401){
                        toast.error(err?.response?.data);
                    }
                });
            }
            
        }
        

  return (
        <>
        <div><Toaster position="top-right" reverseOrder={false} toastOptions={{duration: 3000}}/></div>
        <Card sx={{margin:"50px auto", backgroundColor:"#242424" , padding: "10px",  maxWidth: 450 , textAlign: 'center' ,  boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;" }}>
                    <CardContent sx={{color:"#fff"}}>
                    <Typography >
                        <h2>
                             Create An Account
                        </h2>
                </Typography>
                <Typography>
                    <p>
                    Enter Your Details Below
                    </p>
                </Typography>
                <Input
                    sx={{paddingTop: "20px",marginBottom: '10px' , width: "80%" , color:"#fff" }}
                    type='Name'
                    placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    sx={{paddingTop: "20px",marginBottom: '10px' , width: "80%" , color:"#fff" }}
                    type='PhoneNumber'
                    placeholder='PhoneNumber'
                    value={phonenum}
                    onChange={(e) => setPhoneNum(e.target.value)}
                />
                <Input
                      sx={{paddingTop: "20px",marginBottom: '10px', width: "80%" , color:"#fff"}}
                    type='Email'
                    placeholder='Email'
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                />
                <Input
                      sx={{paddingTop: "20px",marginBottom: '10px' , width: "80%" , color:"#fff"}}
                      type='Password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                
                <RadioGroup sx={{ flexDirection: 'row', justifyContent: 'center',paddingTop:"20px",marginBottom: '10px' }} value={gender} onChange={handleGenderChange}>
                 <Typography sx={{padding:"9px"}}>Gender :</Typography>   
                <FormControlLabel value="Male" control={<Radio color="default" />} label="Male" sx={{ color: "#fff" }} />
                <FormControlLabel value="Female" control={<Radio color="default" />} label="Female" sx={{ color: "#fff" }} />
                <FormControlLabel value="Other" control={<Radio color="default" />} label="Other" sx={{ color: "#fff" }} />
                </RadioGroup>
                    <Button onClick={onsumbit} sx={{width:"100%",backgroundColor:"#fff" , color:"#242424", marginTop:"20px", ":hover": {color:"#fff"}}}>
                        Create Account
                    </Button>
                    <Button sx={{width:"100%",backgroundColor:"#fff" , color:"#242424", marginTop:"20px", ":hover": {color:"#fff"}}}>
                        <GoogleIcon sx={{marginBottom: "5px"}}/> Sign Up with Google
                    </Button>
                    <Typography sx={{marginTop:"20px", color:"#fff"}}>
                        Already Have Account? <Link to='/log-in' className='login'>Log in</Link>
                    </Typography>
                    </CardContent>
                </Card>
        </>
  )
}

export default SignUp