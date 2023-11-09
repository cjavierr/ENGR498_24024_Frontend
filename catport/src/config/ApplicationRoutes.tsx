import React from 'react';
import { Route, Routes} from "react-router-dom";
import Home from '../components/pages/home';

import MainLayout from '../components/layouts/MainLayout'; // Import the main application layout


const ApplicationRoutes: React.FC = () => {

  return (
    <Routes>
      <Route
        path="*"
        element={
            <MainLayout>
              <Routes>
                <Route path="/Home" element={<Home />} />
              </Routes>
            </MainLayout>
        }
      />
    </Routes>
  );
};

export default ApplicationRoutes;