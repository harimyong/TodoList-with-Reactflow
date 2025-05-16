import "@xyflow/react/dist/style.css";
import { ReactFlowProvider } from "@xyflow/react";
import AddNodeBtn from "./AddNodeBtn";
import FlowContent from "./FlowContent";

const TodoflowPanel = ({
  todos,
  setTodos,
  setViewmode,
  showedNodeid,
  setShowedNodeid,
}) => {
  const todoflowBundle = {
    todos,
    setTodos,
    setViewmode,
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
            <AddNodeBtn {...todoflowBundle} todoid={todo.id}></AddNodeBtn>
          </div>
        ) : null
      )}

      {todos.map((todo) =>
        todo.id === showedNodeid ? (
          <div className="todoflowBox">
            {/* <ReactFlowProvider>
              <FlowContent
                nodes={todo.nodes}
                edges={todo.edges}
                {...todoflowBundle}
              ></FlowContent>
            </ReactFlowProvider> */}
          </div>
        ) : null
      )}
    </div>
  );
};

export default TodoflowPanel;
