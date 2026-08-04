import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import AuthForm from "./pages/authentication/AuthForm.jsx";

import { store } from "./store/store.js";
import { Provider } from "react-redux";
import ProtectedRoute from "./utility/ProtectedRoute.jsx";
import NoteForm from "./pages/components/NoteForm.jsx";
import UpdateForm from "./pages/components/UpdateForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/auth",
    element: <AuthForm />,
  },
  {
    path: "/create-note",
    element: <NoteForm />,
  },
  {
    path: "/update-note/:userId/:noteId",
    element: <UpdateForm />,
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>,
);
