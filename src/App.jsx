

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import PackagePage from './Outlet'
import Admin_panel from './Pages/Admin_panel'
import Reg_auth from './Pages/registration_autorisationUser'
import Card from './Components/Card'
import CreateCard from './Pages/CreateCard'

function App() {

  return (
    <>
    <BrowserRouter>
    <PackagePage/>
    <Routes>
      <Route path = "/" element={<Home/>}/>
      <Route path = "/createCard" element = {<Admin_panel/>}/>
      <Route path='/user' element = {<Reg_auth/>}/>
      <Route path='/post/:postId' element = {<Card/>}/>
      <Route path='/Card/Create' element = {<CreateCard/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
