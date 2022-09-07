import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './Components/Layouts/Header';
import Loader from './Components/Layouts/Loader';
import Home from './Components/Pages/Home';
import Hospital from './Components/Pages/Hospital/Hospital';
import Login from './Components/Pages/Auth/Login';
import Register from './Components/Pages/Auth/Register';

const App = () => {

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [userData, setUserData] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  return (
    <BrowserRouter>
      <Loader isLoading={isLoading}/>
      <Header userData={userData} setUserData={value => setUserData(value)} setIsUserLoggedIn={ value => setIsUserLoggedIn(value)} isUserLoggedIn={isUserLoggedIn}/>
      <div className="container">
        <Switch>
          { isUserLoggedIn ? 
            (<>
              <Route path="/" exact>
                <Home userData={userData} setUserData={value => setUserData(value)}/>
              </Route>
              <Route path="/hospital/:id" exact>
                <Hospital userData={userData}/>
              </Route>
            </>)
          : 
            (<>
              <Route path="/" exact>
                <Login setUserData={value => setUserData(value)} setIsUserLoggedIn={ value => setIsUserLoggedIn(value)}/>
              </Route>
              <Route path="/register" exact>
                <Register setUserData={value => setUserData(value)} setIsUserLoggedIn={ value => setIsUserLoggedIn(value)}/>
              </Route>
            </>) 
          }
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
