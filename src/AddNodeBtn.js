import { useCallback } from "react";

const AddNodeBtn = ({ todoid, nodes, setNodes }) => {
  const handleAddNode = useCallback(() => {
    const Nodeid = crypto.randomUUID(); // 고유 ID
    const x = Math.random() * 600;
    const y = Math.random() * 400;

    const newNode = {
      id: Nodeid,
      position: { x, y },
      data: { label: "new Node" },
      type: "default",
    };
    setNodes(
      nodes.map((node) =>
        node.id === todoid ? { ...node, nodes: [...node.nodes, newNode] } : node
      )
    );
  }, [todoid, nodes, setNodes]);

  return <button onClick={handleAddNode}>노드 추가</button>;
};

export default AddNodeBtn;
