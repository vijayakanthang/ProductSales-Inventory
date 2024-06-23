import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Statistics from './components/Statistics'
import AddItem from './components/AddItem'
import Home from './components/Home'
import Header from './components/Header'


const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route  path ="/"element={<Home/>}></Route>
        <Route  path ="/stats"element={<Statistics/>}></Route>
        <Route  path ="/additem"element={<AddItem/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App