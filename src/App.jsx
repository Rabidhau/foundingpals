import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Signup from "./signup";
import Homepage from "./homepage";
import Login from "./Login";
import LandingPage from "./landingpage";
import Auth from "./auth";
import Idea from "./idea";
import JobCard from "./jobcard";
import IndividualIdea from "./individualidea";
import Collab from "./collab";
import Explore from "./explore";
import Myideas from "./myideas";
import Archive from "./archiveidea";
import AcceptedIdeas from "./acceptedideas";
import Rejectedideas from "./rejectedIdeas";
import ContractPage from "./contractpage";
import Agreement from "./contract";
import Messages from "./messages"
import PalPage from "./palpage";
import Success from "./success";
import Preview from "./preview";
import Dashboard from "./admin_dashboard";
import Admin_idea from "./admin_ideas";
import Messages_admin from "./admin_messages";
import PalPage_admin from "./admin_pal";
import Admin_contract from "./admin_contract";
import ForgetPassword from "./forgetpassword";

function App() {
  const router = createBrowserRouter([
    { path: "/home", element: <Homepage /> },
    { path: "/", element: <LandingPage /> },
    { path: "/authentication", element: <Auth /> },
    { path: "/signup", element: <Signup /> },
    { path: "/login", element: <Login /> },
    { path: "/create-idea", element: <Idea /> },
    { path: "/jobcard", element: <JobCard /> },
    { path: "/idea/:id", element: <IndividualIdea /> },
    { path: "/collab-idea", element: <Collab /> },
    { path: "/explore", element: <Explore /> },
    { path: "/my-ideas/active", element: <Myideas /> },
    { path: "/my-ideas/archive", element: <Archive /> },
    { path: "/accepted-ideas", element: <AcceptedIdeas /> },
    { path: "/rejected-ideas", element: <Rejectedideas /> },
    { path: "/messages", element: <Messages /> },
    { path: "/contracts", element: <ContractPage /> },
    { path: "/contracts/agreement", element: <Agreement /> },
    { path: "/pals", element: <PalPage /> },
    { path: "/success", element: <Success /> },
    { path: "/admin_dashboard", element: <Dashboard /> },
    { path: "/admin_idea", element: <Admin_idea /> },
    { path: "/admin_messages", element: <Messages_admin /> },
    { path: "/admin_pals", element: <PalPage_admin /> },
    { path: "/admin_contract", element: <Admin_contract /> },
    { path: "/forgot-password", element: <ForgetPassword /> },
    { path: "/preview/:id", element: <Preview /> }



  ]);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>    
          <ToastContainer position="top-right" autoClose={3000} />
      <RouterProvider router={router} />

    </MantineProvider>
  );
}

export default App;
