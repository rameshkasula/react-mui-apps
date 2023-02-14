import { Navigate, useRoutes } from "react-router-dom";
import { RequireAuth } from "../helpers/RequireAuth";
import Layout from "../components/Layout";
import Profile from "../pages/Profile";
import NotFound from "../pages/Page404";
import LogoOnlyLayout from "../helpers/LogoOnlyLayout";
import Signin from "../pages/auth/Signin";
import Signup from "../pages/auth/Signup";
import MessagesTable from "../components/messages/MessagesTable";
import ProjectTable from "src/components/projects/ProjectTable";
import CreateProject from "src/components/projects/CreateProject";
import CreateUser from "src/components/messages/CreateUser";
import TaskTable from "src/components/tasks/TaskTable";
import CreateTask from "src/components/tasks/CreateTask";
import AssignTask from "src/components/messages/AssignTask";
import UpdateProject from "src/components/projects/UpdateProject";
import ChartWise from "src/components/reports/ChartWise";

export default function Router() {
  return useRoutes([
    {
      path: "auth",
      children: [
        {
          path: "signin",
          element: <Signin />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
      ],
    },
    {
      path: "/",
      element: (
        <RequireAuth>
          <Layout />
        </RequireAuth>
      ),
      children: [
        { path: "/", element: <MessagesTable /> },
        {
          path: "app",
          children: [
            { element: <Navigate to="/app" replace={true} /> },
            { path: "", element: <MessagesTable /> },
            { path: "create", element: <CreateUser /> },
            { path: "assign", element: <AssignTask /> },
            { path: "update", element: <UpdateProject /> },
          ],
        },
        { path: "profile", element: <Profile /> },
        { path: "requests", element: <MessagesTable /> },
        { path: "reports", element: <ChartWise /> },

        {
          path: "tasks",
          children: [
            { element: <Navigate to="/tasks" replace /> },
            { path: "", element: <TaskTable /> },
            { path: "create", element: <CreateTask /> },
            //  { path: ":tagId", element: <TagsCreate /> },
          ],
        },
        // {
        //   path: "projects",
        //   children: [
        //     { element: <Navigate to="/projects" replace /> },
        //     { path: "", element: <ProjectTable /> },
        //     { path: "create", element: <CreateProject /> },
        //     //  { path: ":tagId", element: <TagsCreate /> },
        //   ],
        // },
      ],
    },
    {
      path: "*",
      element: <LogoOnlyLayout />,
      children: [
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
  ]);
}
