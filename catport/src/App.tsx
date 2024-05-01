// src/App.tsx
import React from 'react';
import { HashRouter } from 'react-router-dom';
import ApplicationRoutes from "./config/ApplicationRoutes";

function App() {
  return (
    <HashRouter>
    <ApplicationRoutes />
    </HashRouter>
  );
}
export default App;