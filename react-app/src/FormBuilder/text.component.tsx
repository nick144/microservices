import React from 'react';

const TextComponent = () => {
    return (
        <div className="TextComponent">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                    First Name
                </label>
                <input 
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                id="grid-first-name" 
                type="text" 
                placeholder="Jane" />
                <p className="text-red-500 text-xs italic">Please fill out this field.</p>
            </div>
        </div>
    );
}