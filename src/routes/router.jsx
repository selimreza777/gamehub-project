
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import MyProfile from "../pages/MyProfile.jsx";
import AllGames from "../pages/AllGames.jsx";
import NotFound from "../pages/NotFound.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> }, // optional /home route
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/forgot-password", element: <ForgotPassword /> },

      {
        path: "/myprofile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },

      {
        path: "/games/:id?", // optional parameter :id
        element: (
          <PrivateRoute>
            <AllGames />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
