import { useState } from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Container from '@mui/material/Container';
import HomeComponent from './components/Home';
import Addpersonalinfo from './components/Addpersonalinfo'
import SavingsComponent from './components/SavingsComponent'
import NeedComponent from './components/NeedComponent'



function App() {

  
  return (
    <Container maxWidth="sm">
      <Routes>


        <Route exact path="addinfo" element={<Addpersonalinfo />} />
        <Route exact path="savings" element={<SavingsComponent />} />
        <Route exact path="need" element={<NeedComponent />} />


        <Route exact path="/" element={<HomeComponent />} />



      </Routes>
    </Container>
  )
}

export default App
