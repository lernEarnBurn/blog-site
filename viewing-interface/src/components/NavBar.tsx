import { ModeToggle } from "./mode-toggle"

import { useNavigate } from "react-router-dom"

interface navBarProps {
  loggedIn: boolean,
  setLoggedIn:  React.Dispatch<React.SetStateAction<boolean>>
}

export function NavBar(props: navBarProps){
  const navigate = useNavigate()

  function logOut():void {
    localStorage.removeItem('token')
    props.setLoggedIn(false)
    navigate('/')
  }

  return ( 
    <nav className="flex gap-4">
      <h1>Blog Creator</h1>
      <ModeToggle/>
      {props.loggedIn && <a className="cursor-pointer" onClick={logOut}>Sign Out</a>}
    </nav>
  )
}