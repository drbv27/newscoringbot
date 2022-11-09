import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import SignIn from './routes/SignIn';
import Home from './routes/Home'
import './App.css'
import Challenges from './routes/Challenges';
import Events from './routes/Events';
import Users from './routes/Users';
import Teams from './routes/Teams';
import AddEvent from './routes/AddEvent';
import AddUser from './routes/AddUser';
import AddChallenge from './routes/AddChallenge';

function App() {

  return (
    <AuthContextProvider>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/home' element={<Home />} />
        <Route path='/events' element={<Events />} />
        <Route path='/events/addevent' element={<AddEvent/>} />
        <Route path='/challenges' element={<Challenges />} />
        <Route path='/challenges/addchallenge' element={<AddChallenge />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/adduser' element={<AddUser />} />
        <Route path='/teams' element={<Teams />} />
      </Routes>
    </AuthContextProvider>
  )
}

export default App
