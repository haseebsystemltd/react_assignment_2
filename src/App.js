import logo from './logo.svg';
import './App.css';
import Register from "./components/Registration";
import Login from './components/Login';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/includes/Headers';
import Footer from './components/includes/Footer';
import { useState } from 'react';
import Blog from './components/blog';
import Logout from './components/logout';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';

function App() {

  let [users, setUsers] = useState([]);
  let [loginError, setLoginError] = useState('');
  let [authenticatedUser, setAuthenticatedUser] = useState(localStorage.getItem('user') ? true : false);

  let navigate = useNavigate();

  function registerNewUser(newUser) {
    let newUserList = [...users];
    newUserList.push(newUser);
    setUsers(newUserList);
  }


  function loginHandler(userData) {
    let newUserList = [...users];

    const loginUserIndex = newUserList.findIndex((element) => element.email === userData.email);

    if (loginUserIndex != '-1') {

      if (newUserList[loginUserIndex].status == 'blocked') {
        return setLoginError('User Blocked due to multiple Failed Attempts');
      }

      if (newUserList[loginUserIndex].password === userData.password) {
        localStorage.setItem('user', JSON.stringify(newUserList[loginUserIndex]));
        setAuthenticatedUser(true);
        navigate('/dashboard');
      } else {

        newUserList[loginUserIndex].loginAttempts++

        if (newUserList[loginUserIndex].loginAttempts > 2) {
          newUserList[loginUserIndex].status = 'blocked';
          setLoginError('User Blocked due to multiple Failed Attempts');
        } else {
          setLoginError('Incorrect Password');
        }

      }
    } else {
      setLoginError('User not found');
    }
    setUsers(newUserList);
  }

  return (
    <div className="App">

      <Header authenticatedUser={authenticatedUser} />

      <Routes>
      <Route
          path='/'
          Component={() => {
            return (
              <Auth authenticatedUser={authenticatedUser} authUser="not-allowed">
                <Login loginHandler={loginHandler} loginError={loginError} setLoginError={setLoginError} />
              </Auth>
            )
          }}
          exact
        />
        <Route
          path='/dashboard'
          Component={() => {
            return (
              <Auth authenticatedUser={authenticatedUser} authUser="allowed">
                <Dashboard />
              </Auth>
            )
          }}
          userList={users}
          exact
        />
        <Route
          path='/blog'
          Component={Blog}
          userList={users}
          exact
        />
        <Route
          path='/register'
          Component={() =>  {
            return (
              <Auth authenticatedUser={authenticatedUser} authUser="not-allowed">
                <Register newUser={registerNewUser} />
              </Auth>
            )
          }}
          exact
        />
        <Route
          path='/login'
          Component={() => {
            return (
              <Auth authenticatedUser={authenticatedUser} authUser="not-allowed">
                <Login loginHandler={loginHandler} loginError={loginError} setLoginError={setLoginError} />
              </Auth>
            )
          }}
          exact
        />
        <Route
          path='/logout'
          Component={() =>  {
            return (
              <Auth authenticatedUser={authenticatedUser} authUser="allowed">
                <Logout setAuthenticatedUser={setAuthenticatedUser} />
              </Auth>
            )
          }}
          exact
        />
        <Route
          path='*'
          Component={() => <h1>ERROR 404</h1>}
          exact
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
