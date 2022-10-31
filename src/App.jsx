import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import SignIn from './routes/SignIn';
import './App.css'

function App() {

  return (
    <AuthContextProvider>
      <Routes>
        <Route path='/' element={<SignIn />} />
      </Routes>
    </AuthContextProvider>
  )
}

export default App
