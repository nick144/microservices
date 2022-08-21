import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

const Navigation = () => {
    return (
        <div className='Navigation'>
            <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <img className='h-24' src={logo} alt="Logo" />
                </div>
                <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                    <div className="text-sm lg:flex-grow">
                        <Link className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" to="/">Home</Link>
                        <Link className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" to="/blogs">Blogs</Link>
                        <Link className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" to="/blog/new">Add Blog</Link>
                        <Link className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" to="/login">Login</Link>
                        <Link className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white" to="/register">Sign up</Link>
                    </div>
                </div>
            </nav>
        </div>
    );
};
export default Navigation;