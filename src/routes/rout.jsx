import React from 'react'
import{Routes,Route} from 'react-router-dom'
import Home from '../components/home.jsx'

import CategoryCard from '../components/CategoryCard.jsx'

import Contact from '../components/contact.jsx'
import About from '../components/about.jsx'


const Rout = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/> 

        <Route path="/category/:categoryName" element={<CategoryCard />}/>
        <Route path="/about" element={<About/>}/>

        <Route path='/contact' element={<Contact/>}/>     

    </Routes>
  )
}

export default Rout

