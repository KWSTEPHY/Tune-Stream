import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Home from './components/Home';
import Page from './components/Page';

const App = () => {
  const [isHomePage, setIsHomePage] = useState(true);
  return (
  
<div >

{isHomePage?<Home/>:<Page/>}
<button type='button' onClick={() => setIsHomePage(!isHomePage)} className="size-12 border-2 border-gray-300 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>
          </button>
</div>
  );
};

export default App;
