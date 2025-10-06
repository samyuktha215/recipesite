import React from 'react'
import{Routes,Route} from 'react-router-dom'
import Home from '../components/home.jsx'
import CategoryCard from '../components/CategoryCard.jsx'

const Rout = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/> 
        
        <Route path="/category/:categoryName" element={<CategoryCard />}/>
            
    </Routes>
  )
}

export default Rout

