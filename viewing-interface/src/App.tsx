import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'

import { NavBar } from './components/NavBar'
import { LoginForm } from './components/LoginForm'
import { SignupForm } from './components/SignupForm'
import { BlogMenu } from './components/BlogMenu'
import { BlogPage } from './components/BlogPage'

import { ThemeProvider } from "@/components/theme-provider"


function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'))


  //maybe store the decoded jwt in a context api

  //might want to have the / direct to BlogMenu even if not logged in because most of app is ok without login
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <Routes>
        <Route path="/" element={ loggedIn ? ( <Navigate to="/blogs"/> ) : ( <Navigate to="/log-in"/> ) }/> 
        <Route path="/log-in" element={<LoginForm setLoggedIn={setLoggedIn}/>}/>
        <Route path="/sign-up" element={<SignupForm setLoggedIn={setLoggedIn}/>}/>
        <Route path="/blogs" element={<BlogMenu/>}/>
        <Route path="/blogs/:blogId" element={<BlogPage/>}/>
      </Routes>
    </ThemeProvider>
  )
}

export default App
