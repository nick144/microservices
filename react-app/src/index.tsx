import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Blogs from './components/blog/blogs.component';
// import AddPost from './posts/AddPost';
import AddBlog from './components/blog/add-blog.component';
import SignUp from './components/user/signup.component';
import Login from './components/user/Login.component';
import Logout from './components/user/logout.component';
import DeleteBlog from './components/blog/delete.component';

// import Signup from './users/Signup';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <div className='Index'>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<App />} />
          
          <Route path='/register' element={<SignUp />} />          
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/blog/new' element={<AddBlog />} />
          <Route path='/blog/:id' element={<AddBlog />} />
          <Route path='/blog/delete/:id' element={<DeleteBlog />} />            
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </div>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
