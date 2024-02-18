import { createBrowserRouter } from "react-router-dom";
import {Home, Login} from "../pages/index";
import { RouterProvider } from "../libs/router-provider";
import path from "../utils/paths";

const router = createBrowserRouter([
    {
        path: path.HOME,
        element: <Home></Home>
    }, 
    {
        path: path.LOGIN,
        element: <Login></Login>
    }
])

export const AppRoutes = () => {
    return <RouterProvider router={router}></RouterProvider>;
  };