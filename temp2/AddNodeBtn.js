import { useCallback } from "react";

const AddNodeBtn = ({ todoid, todos, setTodos }) => {
  const handleAddNode = useCallback(() => {
    const Nodeid = crypto.randomUUID(); // 고유 ID
    const x = Math.random() * 600;
    const y = Math.random() * 400;

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

export default AddNodeBtn;
