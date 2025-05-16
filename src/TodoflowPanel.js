import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  applyNodeChanges,
} from "@xyflow/react";
import { useCallback, useState, useEffect } from "react";

const AddNodeBtn = ({ todoid, todos, setTodos }) => {
  const handleAddNode = useCallback(() => {
    const Nodeid = crypto.randomUUID(); // 고유 ID
    const x = Math.random() * 150;
    const y = Math.random() * 75;

    const newNode = {
      id: Nodeid.slice(0, 4),
      position: { x, y },
      data: { label: "new Node" },
      type: "default",
    };

    setTodos(
      todos.map((todo) =>
        todo.id === todoid
          ? {
              ...todo,
              nodes: [...todo.nodes, newNode],
            }
          : todo
      )
    );
  }, [todoid, todos, setTodos]);

  return <button onClick={handleAddNode}>노드 추가</button>;
};

const TodoflowPanel = ({
  todos,
  setTodos,
  showedNodeid,
  setShowedNodeid,
  setViewmode,
}) => {
  const [selectedTodo, setSelectedTodo] = useState(
    todos.find((todo) => todo.id === showedNodeid)
  );
  const [nodes, setNodes] = useNodesState(selectedTodo.nodes);

  useEffect(() => {
    setSelectedTodo(todos.find((todo) => todo.id === showedNodeid));
  }, [showedNodeid, todos]);

  useEffect(() => {
    setNodes(selectedTodo.nodes);
  }, [selectedTodo, setNodes]);

  const handleNodesChange = useCallback(
    (changes) => {
      setNodes((nds) => {
        const updated = applyNodeChanges(changes, nds);
        setTodos(
          todos.map((todo) =>
            todo === selectedTodo
              ? { ...todo, nodes: applyNodeChanges(changes, nds) }
              : todo
          )
        );
        return updated;
      });
    },
    [setNodes, selectedTodo, todos, setTodos]
  );

  const handleClose = () => {
    setViewmode("all");
    setTodos(todos.map((todo) => ({ ...todo, ischecked: false })));
    setShowedNodeid(0);
  };

  return (
    <div id="flowContainer" className="parent rowSorted divBox">
      {todos.map((todo) =>
        todo.ischecked === true ? (
          <div id="todoflowToolbar" className="divBox bordBox">
            <div>
              {`현재 todo :`} {todo.name}
            </div>
            <button onClick={handleClose}>닫기</button>
            <AddNodeBtn
              todos={todos}
              setTodos={setTodos}
              todoid={todo.id}
            ></AddNodeBtn>
          </div>
        ) : null
      )}
      <div id="todoflowBox" className="bordBox">
        <ReactFlow
          style={{
            backgroundColor: "#EDD5D0",
            borderRadius: "10px",
          }}
          nodes={nodes}
          onNodesChange={handleNodesChange}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default TodoflowPanel;
