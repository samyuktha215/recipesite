import React from 'react'
import{Routes,Route} from 'react-router-dom'
import Home from '../components/home.jsx'
import RecipeDetails from '../components/recipes/RecipeDetails.jsx'
import RecipesPage from '../components/recipes/RecipesPage.jsx'
import CategoryCard from '../components/CategoryCard.jsx'

import Contact from '../components/contact.jsx'
import About from '../components/about.jsx'
import ProtectedRoute from './protectedRoute.jsx'


const Rout = () => {
  return (
    <Routes>
        <Route path='/' element={
          <ProtectedRoute><Home/></ProtectedRoute>}/> 

        <Route path="/category/:categoryName" element={<CategoryCard />}/>
        <Route path="/about" element={<ProtectedRoute><About/></ProtectedRoute>}/>

        <Route path="/contact" element={<ProtectedRoute><Contact/></ProtectedRoute>}/>

        <Route path="/recipes" element={<RecipesPage />} />

        <Route path="/recipes/:slug" element={<RecipeDetails />} />

        

    </Routes>
  )
}

export default Rout

