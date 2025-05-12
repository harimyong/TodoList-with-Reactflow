const TodoMemo = ({ todos }) => {
  return (
    <div
      className="todoMemo"
      style={{
        display: todos.every((todo) => todo.ischecked === false)
          ? "none"
          : "flex",
      }}
    ></div>
  );
};

export default TodoMemo;
