import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@xyflow/react/dist/style.css";
import "./css/style.css";
import "./css/MainTodolist.css";
import "./css/TodolistToolbar.css";
import "./css/TodoflowPanel.css";
import "./css/TodoMemo.css";
import "./css/OnlyforFlow.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
