import axios from 'axios'

import { useRef, useState } from 'react'
import type { RefObject } from 'react';

import { Input } from "./ui/input"
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"


import { Link, useNavigate } from 'react-router-dom';

interface signUpFormProps {
  setLoggedIn:  React.Dispatch<React.SetStateAction<boolean>>;
}


export function SignupForm(props: signUpFormProps) {
  const usernameRef: RefObject<HTMLInputElement> = useRef(null);
  const passwordRef: RefObject<HTMLInputElement> = useRef(null);

  const [showErrorMessage, setShowErrorMessage] = useState(false)

  const navigate = useNavigate();

  async function submitNewUser(): Promise<void> {
    try {
      const response = await axios.post(
        'http://localhost:3000/sign-up', {
          username: usernameRef.current?.value.trim(),
          password: passwordRef.current?.value.trim()
      })
  
      //if it succeeds than auto login
      if(response.data.user){
        const logIn = await axios.post(
          'http://localhost:3000/log-in', {
            username: usernameRef.current?.value.trim(),
            password: passwordRef.current?.value.trim()
        })
  
        if(logIn.data.token){
          localStorage.setItem('token', response.data.token)  
          setShowErrorMessage(false)
          props.setLoggedIn(true)
          navigate('/')
        }else{
          setShowErrorMessage(true)
        }
      }else{
        console.log('create user failed')
      }
    } catch (err){
      console.log(err)
    }
    
  }


  return(
    <div className='flex justify-center items-center h-[85vh]'>
      <Card className='w-[25vw] mx-auto'>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <Input ref={usernameRef} type="text" name="username" placeholder="Username"/>
        </CardContent>
        <CardContent>
          <Input ref={passwordRef} type="password" name="password" placeholder="Password"/>
        </CardContent>
        <CardContent>
          <Button className='w-full' onClick={submitNewUser}>Submit</Button>
        </CardContent>
        <CardFooter>
          <Link to="/log-in">Login</Link>
        </CardFooter>
      </Card>
    </div>
  )
}