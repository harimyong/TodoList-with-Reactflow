const TodoflowPanel = ({ todos, setTodos, setViewmode }) => {
  const handleClose = () => {
    setViewmode("all");
    setTodos(todos.map((todo) => ({ ...todo, ischecked: false })));
  };

  return (
    <div className="todoflowPanel">
      <button onClick={handleClose}>닫기</button>
    </div>
  );
};

export default TodoflowPanel;
