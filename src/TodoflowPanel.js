import "@xyflow/react/dist/style.css";
import {
  ReactFlow,
  Controls,
  Background,
  // applyNodeChanges,
  // applyEdgeChanges,
  // addEdge,
} from "@xyflow/react";

const TodoflowPanel = ({ todos, setTodos, setViewmode }) => {
  const handleClose = () => {
    setViewmode("all");
    setTodos(todos.map((todo) => ({ ...todo, ischecked: false })));
  };

  return (
    <div className="todoflowPanel">
      {todos.map((todo) =>
        todo.ischecked === true ? (
          <div className="todoflowToolbar">
            <div>{todo.name}</div>
            <button onClick={handleClose}>닫기</button>
            <button>노드 추가</button>
          </div>
        ) : null
      )}

      {todos.map((todo) =>
        todo.ischecked === true ? (
          <div className="todoflowBox">
            <ReactFlow
              nodes={todo.nodes}
              edges={todo.edges}
              style={{
                backgroundColor: "#EDD5D0",
                boxSizing: "border-box",
                overflow: "hidden",
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
