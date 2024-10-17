import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Tablels from './components/order/Tablels'
import Home from './components/home/Home'
import Table from './components/order/Table'

function App() {
  const [count, setCount] = useState(0)

  return (

    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home/>} />
      
      
        <Route path="/orders" element={<Tablels/>} />
        <Route path="/orders/:table_num" element={<Table/>} />
        

    </Routes>
</BrowserRouter>


  )
}

export default App
