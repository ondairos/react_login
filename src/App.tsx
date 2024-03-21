import "./App.css";
import { LoginForm } from "./components/LoginForm/LoginForm";
import { AddressForm } from "./components/AddressForm/AddressForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/address",
    element: <AddressForm />,
  },
]);
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
