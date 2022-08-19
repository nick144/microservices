// import './App.css';
import { useState } from 'react';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedin, setLoggedin] = useState(false);
  const [message, setMessage] = useState(false);
  const jwtToken = sessionStorage.getItem('jwttoken');
  let user = sessionStorage.getItem('user');
  if (user && !loggedin) {
    user = JSON.parse(user);
  }
  const submit = (e) => {
    e.preventDefault();
    fetch("http://localhost/api/v1/users/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "x-access-token": jwtToken
      },
      mode:'cors',
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then((results) => {
      results.json().then((r) => {
        if (!r.status) {
          return;
        }
        setLoggedin(true);
        sessionStorage.setItem("user", JSON.stringify(r.data.user));
        sessionStorage.setItem("jwttoken", r.token);
        user = r.data.user;
      }, (e) => {
        throw e;
      });      
    }, (e) => {
      console.log(e);
    });

    setUsername("");
    setPassword(""); 
  };

  const logout = (e) => {
    e.preventDefault();

    fetch("/api/v1/users/logout", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "x-access-token": jwtToken
      },
      mode:'cors'
    }).then((results) => {
      results.json().then((r) => {
        if (!r.status) {
          return;
        }
        setLoggedin(false);
        setMessage(r.data.msg);
        
      }, (e) => {
        throw e;
      });      
    }, (e) => {
      console.log(e);
    });
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('jwttoken');
  };

  return (
    <div className='Login'>

      {message && (
          <div className="px-4 my-32 max-w-3xl mx-auto space-y-6">
            {/* <h1 className="text-3xl font-semibold">{user.username} Is login</h1> */}
            <p>{message}</p>
          </div>
      )}

      {user && (
          <div className="px-4 my-32 max-w-3xl mx-auto space-y-6">
            <h1 className="text-3xl font-semibold">{user.username} Is login</h1>
            <p><span onClick={logout}>logout</span></p>
          </div>
      )}

      {!user && (
        <form onSubmit={submit} className="px-4 my-32 max-w-3xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-semibold">Login</h1>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
            <input type="text"
              value={username}
              onChange={event => setUsername(event.target.value)}
              placeholder='Username'
              className="border border-grey-400 block py-2 px-4 w-full rounded focus:outline-none focus:border-teal-500"
            />
            </div>
            <div className="w-1/2">
            <input type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              placeholder='Password'
              className="border border-grey-400 block py-2 px-4 w-full rounded focus:outline-none focus:border-teal-500"
            />
            </div>
          </div>
          <button className="px-10 py-1 text-white  bg-cyan-500 hover:bg-cyan-600 rounded-lg">Login</button>
        </form>
        
      )}
    </div>
  );
}

export default Login;