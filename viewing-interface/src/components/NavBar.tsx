import { ModeToggle } from "./mode-toggle"
import { Link, useNavigate } from "react-router-dom"


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
    <nav className="flex justify-between items-center h-[10vh] w-[100vw] px-4 py-12 shadow-sm border-2">
      <a className="text-2xl ml-16" href="http://localhost:5333/">Create Blogs</a>
      <h1>Blog Viewer</h1>
      <div className="flex items-center gap-8 mr-16">
        <ModeToggle />
        {props.loggedIn && <a className="cursor-pointer w-16 text-lg whitespace-nowrap" onClick={logOut}>Sign Out</a>}
        {!props.loggedIn && <Link className="cursor-pointer w-16 text-lg" to='/log-in'>Log In</Link>}
      </div>
    </nav>
  )
}