import React, { useState } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
import {UserContext} from './UserContext'
import Chat from './components/chat/Chat'
import Home from './components/home/Home'
import Navbar from './components/layout/Navbar'
import Login from './components/Auth/Login'
import SignUp from './components/Auth/SignUp'
import Logout from './components/Auth/Logout'
function App() {
  const [user, setUser] = useState('')
  return (
    <Router>
          <div className="App">
            <UserContext.Provider value={{user, setUser}} >
              <Navbar />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/chat/:roomId/:roomName' component={Chat} />
                <Route exact path='/login' component={Login} />
                <Route path='/signup' component={SignUp} />
                <Route path='/logout' component={Logout} />
              </Switch>
            </UserContext.Provider>
          </div>
    </Router>
  );
}

export default App;
