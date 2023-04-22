import { useState, lazy, Suspense } from 'react'
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


const Home = lazy(()=> import('./components/Home'))

function App() {

  
  return (
    <Container maxWidth="md">
      <Suspense fallback={<div>Loading...</div>}>
        <Addpersonalinfo />
      </Suspense>
      
    </Container>
  )
}

export default App
