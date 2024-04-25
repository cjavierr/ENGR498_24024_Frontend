import React from 'react';
import { Route, Routes} from "react-router-dom";
import Home from '../components/pages/home';
import CreateProject from '../components/pages/createProject';
import MainLayout from '../components/layouts/MainLayout'; 
import CreateDashboard from '../components/pages/createDashboard';
import CreateSubcategories from '../components/pages/createSubcategories';
import ProjectListing from '../components/pages/projectListing';
// import ManageDashboard from '../components/pages/createManageDashboard';
import CreateRisk from '../components/pages/createRisk';
import ManageRisk from '../components/pages/manageRisk';
import LoginPage from '../components/pages/logIn';
import SignUp from '../components/pages/signup';
import Dashboard from '../components/pages/dashboard';
import EditRisk from '../components/pages/editRisk';


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
                <Route path="/projectListing" element={<ProjectListing />} />
                
                <Route path="/createRisk" element={<CreateRisk />} />
                <Route path="/manageRisk" element={<ManageRisk />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/editRisk" element={<EditRisk />} />
              </Routes>
            </MainLayout>
        }
      />
    </Routes>
  );
};

export default ApplicationRoutes;