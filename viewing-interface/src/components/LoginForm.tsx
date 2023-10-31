import axios from 'axios'
import { useRef, useState } from 'react'
import type { RefObject } from 'react';

import { Input } from "./ui/input"
import { Button } from "./ui/button"


export function LoginForm(){
  const usernameRef: RefObject<HTMLInputElement> = useRef(null);
  const passwordRef: RefObject<HTMLInputElement> = useRef(null);

  const [showErrorMessage, setShowErrorMessage] = useState(false)

  async function checkLoginCreds(): Promise<void>{
    if(usernameRef.current?.value && passwordRef.current?.value){
      axios.post('http://localhost:3000/log-in', {
        username: usernameRef.current?.value,
        password: passwordRef.current?.value
      })
      .then(function (response) {
        if(response.data.token){
          localStorage.setItem('token', response.data.token)
          setShowErrorMessage(false)
        }else{
          setShowErrorMessage(true)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }


  return (
    <section>
      <Input ref={usernameRef} type="text" name="username" placeholder="Username"/>
      <Input ref={passwordRef} type="password" name="password" placeholder="Password"/>
      {showErrorMessage && <p className='error-message'>Login failed. Please check your credentials.</p>}
      <Button onClick={checkLoginCreds}>Submit</Button>
    </section>
  )
}