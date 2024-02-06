import React from 'react';
import { Route, Routes} from "react-router-dom";
import Home from '../components/pages/home';
import CreateProject from '../components/pages/createProject';
import MainLayout from '../components/layouts/MainLayout'; 
import CreateDashboard from '../components/pages/createDashboard';
import CreateSubcategories from '../components/pages/createSubcategories';
import ProjectListing from '../components/pages/createProjectListing';
import ManageDashboard from '../components/pages/createManageDashboard';


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
                <Route path="/createProjectListing" element={<ProjectListing />} />
                <Route path="/createManageDashboard" element={<ManageDashboard />} />
              </Routes>
            </MainLayout>
        }
      />
    </Routes>
  );
};

export default ApplicationRoutes;