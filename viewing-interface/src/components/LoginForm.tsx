import axios from 'axios'

import { Input } from "./ui/input"
import { Button } from "./ui/button"

type inputValue = string | null

export function LoginForm(){
  async function checkLoginCreds(): Promise<void>{
    const emailValue: inputValue = document.querySelector('input[name="email"]').value
    const passwordValue: inputValue = document.querySelector('input[name="password"]').value

    if(emailValue && passwordValue){
      axios.post('http://localhost:3000/log-in', {
        email: emailValue,
        password: passwordValue
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
      <Input type="text" name="email" placeholder="Email"/>
      <Input type="password" name="password" placeholder="Password"/>
      <Button onClick={checkLoginCreds}>Submit</Button>
    </section>
  )
}