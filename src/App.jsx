import React from 'react'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cat from './pages/listCat/Cat'
import MealsDetails from './pages/MealsDetails/MealsDetails'

const App = () => {
  return <>
  <Routes>
    <Route path='/' element={<Home/>} />
    <Route path="/categories/:id" element={<Cat/>} />
    <Route path="/meal/:idMeal" element={<MealsDetails />} /> 

  </Routes>
  
  
  </>
    
  
}

export default App