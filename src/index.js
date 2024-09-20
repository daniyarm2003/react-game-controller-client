import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MCApp from './pages/MCApp';
import GTAApp from './pages/GTAApp';
import NoPage from './pages/NoPage';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import TerrariaApp from './pages/TerrariaApp';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage />} />
        <Route exact path="/minecraft" element={<MCApp />} />
        <Route exact path="/gta" element={<GTAApp />} />
        <Route exact path="/terraria" element={<TerrariaApp />} />
        <Route path='*' element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
