import { useState } from "react";
import { useNodesState } from "@xyflow/react";

import TodoListToolbar from "./TodolistToolbar";
import MainTodoList from "./MainTodolist";
import TodoflowPanel from "./TodoflowPanel";
import TodoMemo from "./TodoMemo";

export default function App() {
  const [todos, setTodos] = useState([]); //many todos
  const [id, setId] = useState(1); //a todo id
  const [viewmode, setViewmode] = useState("all"); //viewmode : all, done, inprogress, edit, close
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [showedNodeid, setShowedNodeid] = useState(0);
  const todoprops = {
    todos,
    setTodos,
    id,
    setId,
    viewmode,
    setViewmode,
    nodes,
    setNodes,
    onNodesChange,
    showedNodeid,
    setShowedNodeid,
  };

  return (
    <div className={`todoWrapper ${viewmode === "edit" ? "edit" : ""}`}>
      <div className={`todoContent ${viewmode === "edit" ? "edit" : ""}`}>
        <div className="todoTitle">TodoList</div>
        {viewmode === "edit" ? null : (
          <TodoListToolbar {...todoprops}></TodoListToolbar>
        )}
        <MainTodoList {...todoprops}></MainTodoList>
      </div>
      {viewmode === "edit" ? (
        <div className={`todoEditPanel ${viewmode === "edit" ? "edit" : ""}`}>
          <TodoflowPanel {...todoprops}></TodoflowPanel>
          <TodoMemo {...todoprops}></TodoMemo>
        </div>
      ) : null}
    </div>
  );
}
