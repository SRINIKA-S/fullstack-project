import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Search from './components/search/search';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import Feed from './components/feed/feed';

const theme = createTheme({
  palette: {
    primary: {
      main: "#f44336",
    },
    secondary: {
      main: "#3ea6ff",
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Routes>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup/>} />
          <Route path="/feed" element={<Feed/>} />
          <Route path='forgotpswd' element={<Search/>}/>
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
