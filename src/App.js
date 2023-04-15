import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import NavBar from './components/NavBar';
import News from './components/News';

const App = () => {
  const pageSize = 8;
  const [progress, setProgress] = useState(0);
  const APIKEY = process.env.REACT_APP_NEWS_APIKEY;
  const setPrograss = (progress) => { setProgress(progress) }

  return (
    <div>
      <Router>
        <NavBar />
        <LoadingBar color='#f11946' height={3} progress={progress} />
        <Routes>
          <Route path='/' element={<News setPrograss={setPrograss} apiKey={APIKEY} key="general" pageSize={pageSize} country='in' category="general" />} />
          <Route path='/business' element={<News setPrograss={setPrograss} apiKey={APIKEY} key="business" pageSize={pageSize} country='in' category="business" />} />
          <Route path='/entertainment' element={<News setPrograss={setPrograss} apiKey={APIKEY} key="entertainment" pageSize={pageSize} country='in' category="entertainment" />} />
          <Route path='/general' element={<News setPrograss={setPrograss} apiKey={APIKEY} key="general" pageSize={pageSize} country='in' category="general" />} />
          <Route path='/health' element={<News setPrograss={setPrograss} apiKey={APIKEY} key="health" pageSize={pageSize} country='in' category="health" />} />
          <Route path='/science' element={<News setPrograss={setPrograss} apiKey={APIKEY} key="science" pageSize={pageSize} country='in' category="science" />} />
          <Route path='/sports' element={<News setPrograss={setPrograss} apiKey={APIKEY} key="sports" pageSize={pageSize} country='in' category="sports" />} />
          <Route path='/technology' element={<News setPrograss={setPrograss} apiKey={APIKEY} key="technology" pageSize={pageSize} country='in' category="technology" />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
