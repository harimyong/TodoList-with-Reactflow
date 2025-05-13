import "@xyflow/react/dist/style.css";
import {
  ReactFlow,
  Controls,
  Background,
  ReactFlowProvider,
} from "@xyflow/react";
import AddNodeBtn from "./AddNodeBtn";

const TodoflowPanel = ({
  todos,
  setTodos,
  setViewmode,
  nodes,
  setNodes,
  onNodesChange,
  showedNodeid,
  setShowedNodeid,
}) => {
  const todoflowBundle = {
    todos,
    setTodos,
    setViewmode,
    nodes,
    setNodes,
    onNodesChange,
    showedNodeid,
    setShowedNodeid,
  };

  const handleClose = () => {
    setViewmode("all");
    setTodos(todos.map((todo) => ({ ...todo, ischecked: false })));
    setShowedNodeid(0);
  };

  return (
    <div className="todoflowPanel">
      {todos.map((todo) =>
        todo.ischecked === true ? (
          <div className="todoflowToolbar">
            <div>{todo.name}</div>
            <button onClick={handleClose}>닫기</button>
            <ReactFlowProvider>
              <AddNodeBtn {...todoflowBundle} todoid={todo.id}></AddNodeBtn>
            </ReactFlowProvider>
          </div>
        ) : null
      )}

      {nodes.map((node) =>
        node.id === showedNodeid ? (
          <div className="todoflowBox">
            <ReactFlow
              nodes={node.nodes}
              edges={[]}
              onNodesChange={onNodesChange}
              style={{
                backgroundColor: "#EDD5D0",
              }}
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>
        ) : null
      )}
    </div>
  );
};

export default TodoflowPanel;
