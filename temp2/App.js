import { useState } from "react";
import { ReactFlowProvider } from "@xyflow/react";

import TodoListToolbar from "./TodolistToolbar";
import MainTodoList from "./MainTodolist";
import TodoflowPanel from "./TodoflowPanel";
import TodoMemo from "./TodoMemo";

export default function App() {
  const [todos, setTodos] = useState([]); //many todos
  const [id, setId] = useState(1); //a todo id
  const [viewmode, setViewmode] = useState("all"); //viewmode : all, done, inprogress, edit, close
  const [showedNodeid, setShowedNodeid] = useState(0);
  const todoprops = {
    todos,
    setTodos,
    id,
    setId,
    viewmode,
    setViewmode,
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
          <ReactFlowProvider>
            <TodoflowPanel {...todoprops}></TodoflowPanel>
          </ReactFlowProvider>
          <TodoMemo {...todoprops}></TodoMemo>
        </div>
      ) : null}
    </div>
  );
}

// import { useCallback, useState, useEffect } from "react";
// import {
//   ReactFlow,
//   ReactFlowProvider,
//   Background,
//   Controls,
//   useNodesState,
//   useEdgesState,
//   addEdge,
//   applyNodeChanges,
//   applyEdgeChanges,
// } from "@xyflow/react";
// import "@xyflow/react/dist/style.css";

// let nodeId = 0;
// const getId = () => `node-${nodeId++}`;

// const initialTodos = [
//   { id: 1, name: "할 일 1", nodes: [], edges: [] },
//   { id: 2, name: "할 일 2", nodes: [], edges: [] },
// ];

// const TodoFlowApp = () => {
//   const [todos, setTodos] = useState(initialTodos);
//   const [selectedTodoId, setSelectedTodoId] = useState(1);

//   const selectedTodo = todos.find((todo) => todo.id === selectedTodoId);

//   const [nodes, setNodes, onNodesChange] = useNodesState(selectedTodo.nodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(selectedTodo.edges);

//   // selectedTodo가 바뀌면 노드/엣지 초기화
//   useEffect(() => {
//     setNodes(selectedTodo.nodes);
//     setEdges(selectedTodo.edges);
//   }, [selectedTodo]);

//   // 노드 변경 시 해당 todo에 반영
//   const handleNodesChange = useCallback(
//     (changes) => {
//       setNodes((nds) => {
//         const updated = applyNodeChanges(changes, nds);
//         setTodos((prev) =>
//           prev.map((todo) =>
//             todo.id === selectedTodoId ? { ...todo, nodes: updated } : todo
//           )
//         );
//         return updated;
//       });
//     },
//     [selectedTodoId]
//   );

//   // 엣지 변경 시 반영
//   const handleEdgesChange = useCallback(
//     (changes) => {
//       setEdges((eds) => {
//         const updated = applyEdgeChanges(changes, eds);
//         setTodos((prev) =>
//           prev.map((todo) =>
//             todo.id === selectedTodoId ? { ...todo, edges: updated } : todo
//           )
//         );
//         return updated;
//       });
//     },
//     [selectedTodoId]
//   );

//   const handleConnect = useCallback(
//     (params) => {
//       setEdges((eds) => {
//         const updated = addEdge(params, eds);
//         setTodos((prev) =>
//           prev.map((todo) =>
//             todo.id === selectedTodoId ? { ...todo, edges: updated } : todo
//           )
//         );
//         return updated;
//       });
//     },
//     [selectedTodoId]
//   );

//   const handleAddNode = () => {
//     const newNode = {
//       id: getId(),
//       position: {
//         x: Math.random() * 300,
//         y: Math.random() * 300,
//       },
//       data: { label: "새 노드" },
//     };
//     setNodes((prev) => {
//       const updated = [...prev, newNode];
//       setTodos((todos) =>
//         todos.map((todo) =>
//           todo.id === selectedTodoId ? { ...todo, nodes: updated } : todo
//         )
//       );
//       return updated;
//     });
//   };

//   return (
//     <div style={{ height: "100vh" }}>
//       <div style={{ padding: "1rem" }}>
//         {todos.map((todo) => (
//           <button
//             key={todo.id}
//             onClick={() => setSelectedTodoId(todo.id)}
//             style={{
//               marginRight: "1rem",
//               fontWeight: todo.id === selectedTodoId ? "bold" : "normal",
//             }}
//           >
//             {todo.name}
//           </button>
//         ))}
//         <button onClick={handleAddNode}>노드 추가</button>
//       </div>

//       <div style={{ height: "90%" }}>
//         <ReactFlowProvider>
//           <ReactFlow
//             nodes={nodes}
//             edges={edges}
//             onNodesChange={handleNodesChange}
//             onEdgesChange={handleEdgesChange}
//             onConnect={handleConnect}
//             fitView
//             style={{ backgroundColor: "#F5F5F5" }}
//           >
//             <Background />
//             <Controls />
//           </ReactFlow>
//         </ReactFlowProvider>
//       </div>
//     </div>
//   );
// };

// export default TodoFlowApp;
