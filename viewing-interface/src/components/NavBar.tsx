import { ModeToggle } from "./mode-toggle"

export function NavBar(){

  return ( 
    <nav className="flex gap-4">
      <h1>Blog Creator</h1>
      <ModeToggle/>
    </nav>
  )
}