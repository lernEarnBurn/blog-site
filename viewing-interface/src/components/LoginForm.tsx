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

interface loginFormProps {
  setLoggedIn:  React.Dispatch<React.SetStateAction<boolean>>;
}

export function LoginForm(props: loginFormProps){
  const usernameRef: RefObject<HTMLInputElement> = useRef(null);
  const passwordRef: RefObject<HTMLInputElement> = useRef(null);

  const [showErrorMessage, setShowErrorMessage] = useState(false)

  const navigate = useNavigate();

  async function checkLoginCreds(): Promise<void>{
    try {
      const response = await axios.post(
        'http://localhost:3000/log-in', {
          username: usernameRef.current?.value.trim(),
          password: passwordRef.current?.value.trim()
      })

      if(response.data.token){
        localStorage.setItem('token', response.data.token)  
        setShowErrorMessage(false)
        props.setLoggedIn(true)
        navigate('/')
      }else{
        setShowErrorMessage(true)
      }
    } catch(err){
      console.log(err)
    }
  }


 
  return (
    <div className='flex justify-center items-center h-[85vh]'>
      <Card className='w-[25vw] mx-auto'>
        <CardHeader>
          <CardTitle>Log In</CardTitle>
        </CardHeader>
          <CardContent>
            <Input ref={usernameRef} type="text" name="username" placeholder="Username"/>
          </CardContent>
          <CardContent>
            <Input ref={passwordRef} type="password" name="password" placeholder="Password"/>
            {showErrorMessage && <p className='mt-3 mb-[-.5vh] error-message text-sm text-center'>Login failed. Please check your credentials.</p>}
          </CardContent>
          <CardContent>
            <Button className='w-full' onClick={checkLoginCreds}>Submit</Button>
          </CardContent>
          <CardFooter>
            <Link to="/sign-up">Sign Up</Link>
          </CardFooter>
      </Card>
    </div>
  )
}