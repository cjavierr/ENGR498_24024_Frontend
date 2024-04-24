import React from 'react';
import { Route, Routes} from "react-router-dom";
import Home from '../components/pages/home';
import MainLayout from '../components/layouts/MainLayout'; 
import CreateSubcategories from '../components/pages/createSubcategories';
import CreateRisk from '../components/pages/createRisk';
import ManageRisk from '../components/pages/createManageRisk';
import SignUp from '../components/pages/signup';
import GetUser from '../components/pages/GetUser';
import CreateUser from '../components/pages/CreateUser';
import CreateProject from '../components/pages/CreateProject';
import CreateDashboard from '../components/pages/CreateDashboard';
import Login from '../components/pages/Login';
import AddProjectToUser from '../components/pages/AddProjectToUser';
import AddUserToProject from '../components/pages/AddUserToProject';
import GetProject from '../components/pages/GetProject';
import DashboardPage from '../components/pages/DashboardPage';
import ProjectView from '../components/pages/Project';
import ProjectsView from '../components/pages/ProjectsView';
import EditProject from '../components/pages/EditProject';
import DashboardView from '../components/pages/DashboardView';
import DashboardsView from '../components/pages/DashboardsView';
import DashboardMerge from '../components/pages/DashboardMerge';


const ApplicationRoutes: React.FC = () => {

  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="*"
        element={
            <MainLayout>
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/createProject" element={<CreateProject />} />
                <Route path="/createDashboard/:projectId" element={<CreateDashboard />} />
                <Route path="/createSubcategories" element={<CreateSubcategories />} />
                <Route path="/createRisk" element={<CreateRisk />} />
                <Route path="/createManageRisk" element={<ManageRisk />} />
                <Route path="/CreateUser" element={<CreateUser />} />
                <Route path="/ProjectView/:projectId" element={<ProjectView />} />
                <Route path="/projects" element={<ProjectsView />} />
                <Route path="/EditProject/:projectId" element={<EditProject />} />
                <Route path="/dashboardView/:dashboardId" element={<DashboardView />} />
                <Route path="/DashboardMerge/:dashboardId" element={<DashboardMerge />} />

                <Route path="/dashboardsView/" element={<DashboardsView />} />
                <Route path="/Login" element={<Login />} />

              </Routes>
            </MainLayout>
        }
      />
    </Routes>
  );
};

export default ApplicationRoutes;
