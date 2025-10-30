import React from 'react'
import{Routes,Route} from 'react-router-dom'
import Home from '../components/home.jsx'
import RecipeDetails from '../components/recipes/RecipeDetails.jsx'

import CategoryCard from '../components/CategoryCard.jsx'
import CategoryPage from '../components/CategoryPage.jsx'
import Contact from '../components/contact.jsx'
import About from '../components/about.jsx'
import ProtectedRoute from './protectedRoute.jsx'


const Rout = () => {
  return (
    <Routes>
        <Route path='/' element={
          <ProtectedRoute><Home/></ProtectedRoute>}/> 

        <Route path="/category" element={<CategoryCard />}/>

        <Route path="/category/:categoryName" element={<CategoryPage />}/>
        <Route path="/about" element={<ProtectedRoute><About/></ProtectedRoute>}/>

        <Route path="/contact" element={<ProtectedRoute><Contact/></ProtectedRoute>}/>

        <Route path="/categories" element={<CategoryPage />}/>

        <Route path="/recipes/:id" element={<RecipeDetails />} />


        

    </Routes>
  )
}

export default Rout

