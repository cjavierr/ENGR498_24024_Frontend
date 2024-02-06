import React from 'react';
import { Route, Routes} from "react-router-dom";
import Home from '../components/pages/home';
import CreateProject from '../components/pages/createProject';
import MainLayout from '../components/layouts/MainLayout'; 
import CreateDashboard from '../components/pages/createDashboard';
import CreateSubcategories from '../components/pages/createSubcategories';


const ApplicationRoutes: React.FC = () => {

  return (
    <Routes>
      <Route
        path="*"
        element={
            <MainLayout>
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/createProject" element={<CreateProject />} />
                <Route path="/createDashboard" element={<CreateDashboard />} />
                <Route path="/createSubcategories" element={<CreateSubcategories />} />
              </Routes>
            </MainLayout>
        }
      />
    </Routes>
  );
};

export default ApplicationRoutes;