import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  applyNodeChanges,
  NodeToolbar,
  useReactFlow,
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
      type: "TodoflowNode",
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

const nodeTypes = {
  TodoflowNode: FlowNode,
};

function FlowNode({ data, id }) {
  const { setNodes, deleteElements } = useReactFlow();

  const rename = () => {
    const label = prompt("새 노드의 이름을 입력해주세요.");
    if (label) {
      setNodes((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, data: { ...n.data, label } } : n
        )
      );
    }
  };

  const remove = () => {
    deleteElements({ nodes: [{ id }] });
  };

  return (
    <>
      <NodeToolbar
        isVisible={data.forceToolbarVisible || undefined}
        position={data.toolbarPosition}
      >
        <button onClick={rename}>rename</button>
        <button onClick={remove}>delete</button>
      </NodeToolbar>
      <div>{data?.label}</div>
    </>
  );
}

const TodoflowPanel = ({
  todos,
  setTodos,
  showedTodoid,
  setShowedTodoid,
  setViewmode,
}) => {
  const [selectedTodo, setSelectedTodo] = useState(
    todos.find((todo) => todo.id === showedTodoid)
  );
  const [nodes, setNodes] = useNodesState(selectedTodo.nodes);
  const { fitView } = useReactFlow();

  useEffect(() => {
    setSelectedTodo(todos.find((todo) => todo.id === showedTodoid));
    fitView();
    // eslint-disable-next-line
  }, [showedTodoid, todos]);

  useEffect(() => {
    setNodes(
      selectedTodo.nodes.map((nd) => ({
        ...nd,
        selected: false,
      }))
    );
    // eslint-disable-next-line
  }, [selectedTodo]);

  const handleNodesChange = useCallback(
    (changes) => {
      setNodes((nds) => {
        const updated = applyNodeChanges(changes, nds);
        setTodos(
          todos.map((todo) =>
            todo === selectedTodo ? { ...todo, nodes: updated } : todo
          )
        );
        return updated;
      });
    },
    // eslint-disable-next-line
    [todos]
  );

  const handleClose = () => {
    setViewmode("all");
    setTodos(todos.map((todo) => ({ ...todo, ischecked: false })));
    setShowedTodoid(0);
  };
  return (
    <div id="flowContainer" className="parent rowSorted divBox">
      {todos.map((todo) =>
        todo.ischecked === true ? (
          <div id="todoflowToolbar" className="divBox bordBox rowSorted">
            <div>
              {`현재 todo :`} {todo.name}
              <button onClick={handleClose}>닫기</button>
            </div>
            <div>
              <AddNodeBtn
                todos={todos}
                setTodos={setTodos}
                todoid={todo.id}
              ></AddNodeBtn>
            </div>
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
          nodeTypes={nodeTypes}
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
