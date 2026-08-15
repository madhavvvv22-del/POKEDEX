import Home from './pages/Home'
import Pokedex from './pages/Pokedex'
import PokemonDetails from './pages/PokemonDetails'

import React from 'react'
import {BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      
      <Route path='/' element={<Pokedex />}/>
      <Route path='/pokemon/:id' element={<PokemonDetails />}/>

    </Routes>
    </BrowserRouter>
  )
}

export default App