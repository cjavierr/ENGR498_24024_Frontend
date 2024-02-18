import React from 'react';
import { Route, Routes} from "react-router-dom";
import Home from '../components/pages/home';
import CreateProject from '../components/pages/createProject';
import MainLayout from '../components/layouts/MainLayout'; 
import CreateDashboard from '../components/pages/createDashboard';
import CreateSubcategories from '../components/pages/createSubcategories';
import ProjectListing from '../components/pages/createProjectListing';
import ManageDashboard from '../components/pages/createManageDashboard';
import CreateRisk from '../components/pages/createRisk';
import ManageRisk from '../components/pages/createManageRisk';
import LoginPage from '../components/pages/logIn';
import SignUp from '../components/pages/signup';


const ApplicationRoutes: React.FC = () => {

  return (
    <Routes>
      <Route path = "/" element={<LoginPage />} />
      <Route path="/signup" element={<SignUp />} />
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
                <Route path="/createRisk" element={<CreateRisk />} />
                <Route path="/createManageRisk" element={<ManageRisk />} />
              </Routes>
            </MainLayout>
        }
      />
    </Routes>
  );
};

export default ApplicationRoutes;