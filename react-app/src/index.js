import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './users/Login';
import Posts from './posts/Posts';
import AddPost from './posts/AddPost';
import Signup from './users/Signup';
import Layout from './layout/Layout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='Index'>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/blogs' element={<Posts />}>
            <Route
              path='new'
              element={<AddPost />}
              />
          </Route>
          {/* <Route path='/blog/new' element={<AddPost />} /> */}
        </Routes>
      </Layout>
    </BrowserRouter>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
