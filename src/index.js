// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './index.css';
import App from './App';


import LoginPage from './components/LoginPage';

import SignUpPage from './components/SignUpPage';
// import Footer from './components/footer';
// import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  // {
  //   path: "/products",
  //   element: <ProductList />
  // },
  {
    path: "/login",
    element: <LoginPage />
  },
  // {
  //   path: "/contact",
  //   element: <ContactForm />
  // },
  //{
  //   path: "/feedback",
  //   element: <FeedbackForm />
  // },
  {
    path: "/signup",
    element: <SignUpPage />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render
root.render(<RouterProvider router={router} />);
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();