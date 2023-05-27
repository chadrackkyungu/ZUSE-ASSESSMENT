import React from "react";
import { Redirect } from "react-router-dom";
import { LoginRoute } from "../components/RouteName"

//* => AUTHENTICATION
import Login from "../pages/Auth/Login"

//* =>  All routes
import StoreLists from "../pages/Store-lists/index";
import StoreDetails from "../pages/Store-lists/StoreDetails";
import UserLists from "../pages/User-lists/UserLists";


const userRoutes = [
  { path: "/store-lists", component: StoreLists },
  { path: "/store/:id", component: StoreDetails },
  { path: "/user-lists", component: UserLists },
  { path: "/", exact: true, component: () => <Redirect to="/store-lists" /> },
];

const authRoutes = [
  { path: LoginRoute, exact: true, component: Login }
]

export { userRoutes, authRoutes };
