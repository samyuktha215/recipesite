import React from 'react'
import{Routes,Route} from 'react-router-dom'
import Home from '../components/home.jsx'
import Contact from '../components/contact.jsx'


const Rout = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/> 
        <Route path='/contact' element={<Contact/>}/>     
    </Routes>
  )
}

export default Rout

