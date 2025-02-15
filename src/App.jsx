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
    { path: "/my-ideas", element: <Myideas /> },
    { path: "/archive", element: <Archive /> },
  ]);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>    
          <ToastContainer position="top-right" autoClose={3000} />
      <RouterProvider router={router} />

    </MantineProvider>
  );
}

export default App;
