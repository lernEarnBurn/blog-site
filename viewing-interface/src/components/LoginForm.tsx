import axios from 'axios'
import { useState } from 'react'

import { Input } from "./ui/input"
import { Button } from "./ui/button"


export function LoginForm(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function checkLoginCreds(): Promise<void>{
    

    if(username !== '' && password !== ''){
      axios.post('http://localhost:3000/log-in', {
        username: username,
        password: password
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }


  return (
    <section>
      <Input type="text" name="username" placeholder="Username" onChange={(e) => {setUsername(e.target.value)}}/>
      <Input type="password" name="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
      <Button onClick={checkLoginCreds}>Submit</Button>
    </section>
  )
}