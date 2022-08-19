// import './App.css';
import { useState } from 'react';

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword ] = useState();

  // const [error, setError ] = useState();

  const jwtToken = sessionStorage.getItem('jwttoken');
  const submit = (e) => {
    e.preventDefault();
    fetch("/api/v1/users/signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "x-access-token": jwtToken
      },
      mode:'cors',
      body: JSON.stringify({
        username: username,
        password: password,
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone
      })
    }).then((results) => {
      results.json().then((r) => {
        sessionStorage.setItem("user", JSON.stringify(r.data.user));
        sessionStorage.setItem("jwttoken", r.token);
      }, (e) => {
        throw e;
      });      
    }, (e) => {
      console.log(e);
    });

    setUsername("");
    setPassword("");
    setFirstname("");
    setLastname("");
    setEmail("");
    setPhone("");
    setConfirmPassword("");
  };
  return (
    <div className='Signup'>
      <form onSubmit={submit} className="px-4 my-32 max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Register</h1>
        </div>
        <div className="flex space-x-4">
          <div className="w-1/2">
          <input type="text"
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder='Email'
            className="border border-grey-400 block py-2 px-4 w-full rounded focus:outline-none focus:border-teal-500"
          />
          </div>
          <div className="w-1/2">
            <input type="text"
              value={username}
              onChange={event => setUsername(event.target.value)}
              placeholder='Username'
              className="border border-grey-400 block py-2 px-4 w-full rounded focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
          <input type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            placeholder='Password'
            className="border border-grey-400 block py-2 px-4 w-full rounded focus:outline-none focus:border-teal-500"
          />
          </div>
          <div className="w-1/2">
          <input type="password"
            value={confirmPassword}
            onChange={event => setConfirmPassword(event.target.value)}
            placeholder='Confirm password'
            className="border border-grey-400 block py-2 px-4 w-full rounded focus:outline-none focus:border-teal-500"
          />
          </div>
        </div>
        
        <div className="flex space-x-4">
          <div className="w-1/2">
          <input type="text"
            value={firstname}
            onChange={event => setFirstname(event.target.value)}
            placeholder='First name'
            className="border border-grey-400 block py-2 px-4 w-full rounded focus:outline-none focus:border-teal-500"
          />
          </div>
          <div className="w-1/2">
          <input type="text"
            value={lastname}
            onChange={event => setLastname(event.target.value)}
            placeholder='Last name'
            className="border border-grey-400 block py-2 px-4 w-full rounded focus:outline-none focus:border-teal-500"
          />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            <input type="text"
              value={phone}
              onChange={event => setPhone(event.target.value)}
              placeholder='Phone number'
              className="border border-grey-400 block py-2 px-4 w-full rounded focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>
        <button className="px-10 py-1 text-white  bg-cyan-500 hover:bg-cyan-600 rounded-lg">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;