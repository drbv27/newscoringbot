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
import AddTeam from './routes/AddTeam';
import ActiveEvents from './routes/ActiveEvents';
import QualifyEvent from './routes/QualifyEvent';
import QualifyMatch from './routes/QualifyMatch';
import QualifyTask from './routes/QualifyTask';
import MatchGames from './routes/MatchGames'
import Tournament from './routes/Tournament';
import Scores from './routes/Scores';
import ScoresTable from './routes/ScoresTable';

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
        <Route path='/teams' element={<Teams />} />
          <Route path='/teams/addteams' element={<AddTeam />} />
        <Route path='/prueba' element={<MiPrueba />} />
        <Route path='/activeevents' element={<ActiveEvents />} />
          <Route path='/activeevents/:eventId' element={<QualifyEvent />} />
            <Route path='/activeevents/:eventId/match/:matchId' element={<QualifyMatch />} />
            <Route path='/activeevents/:eventId/match/:matchId/games' element={<MatchGames />} />
            <Route path='/activeevents/:eventId/match/:matchId/tournament' element={<Tournament />} />
            <Route path='/activeevents/:eventId/tasks/:taskId' element={<QualifyTask />} />
        <Route path='/scores' element={<Scores/>} />
          <Route path='/scores/:tournament' element={<ScoresTable/>} />
        
      </Routes>
    </AuthContextProvider>
  )
}

export default App
