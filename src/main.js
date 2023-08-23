import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./components/root";
import ErrorPage from "./components/not-found";
import Client , 
      {loader as contactLoader,
        action as contactAction,
      } from "./components/client";
import EditContact, 
      {action as editAction,
      } from "./components/edit";
import { action as destroyAction,
       } from "./components/destroy";
import Index from "./components/index";
window.React = React;

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "main_window",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "contacts/:contactId",
            element: <Client />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: "contacts/:contactId/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);