import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Form from './components/Signup/Form';

import './App.css';
import Success from './components/Success';
import AllUsers from './components/AllUsers';


function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Form />} />
            <Route path='/all-users' element={<AllUsers/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
