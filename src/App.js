import React, { useState } from 'react';
import Home from './components/Home';
import Page from './components/Page';

const App = () => {
  const [isHomePage, setIsHomePage] = useState(false);

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
       
        <button
          type='button'
          onClick={() => setIsHomePage(!isHomePage)}
          className="size-12 border-2 border-gray-300 rounded-full flex items-center justify-center text-white"
        >
          {isHomePage ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10l-9.7-9.7a.7.7 0 00-.982 0L3 10M21 10l-9.7 9.7a.7.7 0 01-.982 0L3 10M21 10H3" />
                </svg>
          ) : (
     
<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v2.293l3.646-3.647a1 1 0 111.415 1.414L11.414 8l3.647 3.647a1 1 0 11-1.414 1.414L10 9.415V12a1 1 0 11-2 0V6a1 1 0 011-1z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h2.293L3.646 5.354a1 1 0 10-1.414 1.414L6.586 9 2.232 13.354a1 1 0 101.414 1.414L6 10.414V13a1 1 0 102 0v-6a1 1 0 01-1-1z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M17 10a1 1 0 00-1-1h-2.293l3.647-3.646a1 1 0 10-1.414-1.414L13.415 9l4.354 4.354a1 1 0 101.414-1.414L15.414 11H18a1 1 0 001-1z" clipRule="evenodd" />
          </svg>

          )}
        </button>
      </nav>
      
      {/* Page content */}
      <div>
        {isHomePage ? <Home /> : <Page />}
      </div>
    </div>
  );
};

export default App;
