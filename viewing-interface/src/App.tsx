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
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <NavBar/>
      <Routes>
        <Route path="/" element={ loggedIn ? ( <Navigate to="/blogs"/> ) : ( <Navigate to="/log-in"/> ) }/> 
        <Route path="/log-in" element={<LoginForm/>}/>
        <Route path="/sign-up" element={<SignupForm/>}/>
        <Route path="/blogs" element={<BlogMenu/>}/>
        <Route path="/blogs/:blogId" element={<BlogPage/>}/>
      </Routes>
    </ThemeProvider>
  )
}

export default App
