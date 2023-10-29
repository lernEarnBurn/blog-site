import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'

import { NavBar } from './components/NavBar'
import { LoginForm } from './components/LoginForm'
import { SignupForm } from './components/SignupForm'
import { BlogMenu } from './components/BlogMenu'
import { BlogPage } from './components/BlogPage'


function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={ loggedIn ? ( <Navigate to="/blogs"/> ) : ( <Navigate to="/log-in"/> ) }/> 
        <Route path="/log-in" element={<LoginForm/>}/>
        <Route path="/sign-up" element={<SignupForm/>}/>
        <Route path="/blogs" element={<BlogMenu/>}/>
        <Route path="/blogs/:blogId" element={<BlogPage/>}/>
      </Routes>
    </>
  )
}

export default App
