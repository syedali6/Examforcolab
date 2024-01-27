import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Home from './uidesign';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />}  />
        <Route path="*" component={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
