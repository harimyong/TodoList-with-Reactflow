import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  applyNodeChanges,
  NodeToolbar,
  useReactFlow,
  addEdge,
  useEdgesState,
  applyEdgeChanges,
  Position,
  Handle,
} from "@xyflow/react";
import { useCallback, useState, useEffect, useLayoutEffect } from "react";

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
    //엣지도 한번에 삭제되게 하기
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

      {/* ───── 8 개의 투명 Handle ───── */}
      {/* Top */}
      <Handle
        id="s-top"
        type="source"
        position={Position.Top}
        className="!opacity-0"
      />
      <Handle
        id="t-top"
        type="target"
        position={Position.Top}
        className="!opacity-0"
      />

      {/* Right */}
      <Handle
        id="s-right"
        type="source"
        position={Position.Right}
        className="!opacity-0"
      />
      <Handle
        id="t-right"
        type="target"
        position={Position.Right}
        className="!opacity-0"
      />

      {/* Bottom */}
      <Handle
        id="s-bottom"
        type="source"
        position={Position.Bottom}
        className="!opacity-0"
      />
      <Handle
        id="t-bottom"
        type="target"
        position={Position.Bottom}
        className="!opacity-0"
      />

      {/* Left */}
      <Handle
        id="s-left"
        type="source"
        position={Position.Left}
        className="!opacity-0"
      />
      <Handle
        id="t-left"
        type="target"
        position={Position.Left}
        className="!opacity-0"
      />
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
  const [edges, setEdges] = useEdgesState(selectedTodo.edges);
  const { fitView } = useReactFlow();

  useLayoutEffect(() => {
    fitView({ padding: 0.2 }); // eslint-disable-next-line
  }, [showedTodoid, nodes.length, fitView]);

  useEffect(() => {
    setSelectedTodo(todos.find((todo) => todo.id === showedTodoid));
    // eslint-disable-next-line
  }, [showedTodoid, todos]);

  useEffect(() => {
    setNodes(selectedTodo.nodes);
    setEdges(selectedTodo.edges);
    // eslint-disable-next-line
  }, [selectedTodo]);

  /* ─── Edge 배열을 todos에 덮어쓰기 ─── */
  const persistEdges = (updatedEdges) =>
    setTodos(
      todos.map((t) =>
        t === selectedTodo ? { ...t, nodes: t.nodes, edges: updatedEdges } : t
      )
    );

  const handleNodesChange = useCallback(
    (changes) => {
      setNodes((nds) => {
        const updated = applyNodeChanges(changes, nds);
        setTodos(
          todos.map((todo) =>
            todo === selectedTodo
              ? { ...todo, nodes: updated, edges: todo.edges }
              : todo
          )
        );
        return updated;
      });
    },
    // eslint-disable-next-line
    [todos]
  );

  const handleEdgesChange = useCallback(
    (changes) => {
      setEdges((edgs) => {
        const updated = applyEdgeChanges(changes, edgs);
        persistEdges(updated);
        return updated;
      });
    },
    // eslint-disable-next-line
    [todos]
  );

  const handleConnect = useCallback(
    (params) => {
      setEdges((eds) => {
        const updated = addEdge(params, eds); // ① React Flow 내부 상태
        persistEdges(updated); // ② todos 에도 저장
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
            <div className="rowSorted" style={{ gap: "10px" }}>
              {`현재 todo : "`} {todo.name + `"`}
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
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={handleNodesChange}
          onEdgesChange={handleEdgesChange}
          onConnect={handleConnect}
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
