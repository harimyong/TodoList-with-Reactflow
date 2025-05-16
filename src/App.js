import { ReactFlowProvider } from "@xyflow/react";
import { useState } from "react";
import TodoListToolbar from "./TodolistToolbar";
import MainTodoList from "./MainTodolist";
import TodoflowPanel from "./TodoflowPanel";
import TodoMemo from "./TodoMemo";
export default function App() {
  const [todos, setTodos] = useState([]); //many todos
  const [viewmode, setViewmode] = useState("all"); //viewmode : all, done, inprogress, edit, close
  const [showedNodeid, setShowedNodeid] = useState(0);

  const props = {
    todos,
    setTodos,
    viewmode,
    setViewmode,
    showedNodeid,
    setShowedNodeid,
  };

  return (
    <ReactFlowProvider>
      <div
        id="todoWrapper"
        className={`parent divBox columnSorted bordBox ${
          viewmode === "edit" ? "edit" : ""
        }`}
      >
        <div
          id="todoContent"
          className={`parent columnSorted divBox bordBox ${
            viewmode === "edit" ? "edit" : ""
          }`}
        >
          <div id="todoTitle">TodoList</div>
          {viewmode === "edit" ? null : (
            <TodoListToolbar {...props}></TodoListToolbar>
          )}
          <MainTodoList {...props}></MainTodoList>
        </div>
        {viewmode === "edit" ? (
          <div
            id="todoEditPanel"
            className={`rowSorted parent divBox bordBox ${
              viewmode === "edit" ? "edit" : ""
            }`}
          >
            <TodoflowPanel {...props}></TodoflowPanel>
            <TodoMemo {...props}></TodoMemo>
          </div>
        ) : null}
      </div>
    </ReactFlowProvider>
  );
}

/*${viewmode === "edit" ? "edit" : ""}*/
