import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Bar from './components/Bar'
import Home from './components/Home'
import Add from './components/Add'
import {Route, Routes, useLocation} from 'react-router-dom'
import Login from './components/Login'

function App() {
  const location = useLocation();

  return (
    <>
    {location.pathname !== '/' && <Bar />}
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/add' element={<Add/>}></Route>
    </Routes>
    
    
    </>
  )
}

export default App
