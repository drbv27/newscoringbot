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
import AddTaskChallenge from './routes/AddTaskChallenge';
import AddMatchChallenge from './routes/AddMatchChallenge';
import MiPrueba from './routes/MiPrueba';

function App() {

  return (
    <AuthContextProvider>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/home' element={<Home />} />
        <Route path='/events' element={<Events />} />
        <Route path='/events/addevent' element={<AddEvent/>} />
        <Route path='/challenges' element={<Challenges />} />
        <Route path='/challenges/addtaskchallenge' element={<AddTaskChallenge />} />
        <Route path='/challenges/addmatchchallenge' element={<AddMatchChallenge />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/adduser' element={<AddUser />} />
        <Route path='/users/adduser' element={<AddUser />} />
        <Route path='/prueba' element={<MiPrueba />} />
      </Routes>
    </AuthContextProvider>
  )
}

export default App
