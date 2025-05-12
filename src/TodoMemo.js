const TodoMemo = ({ todos }) => {
  return (
    <div
      style={{
        display: todos.every((todo) => todo.ischecked === false)
          ? "none"
          : "block",
      }}
      className="todoMemo"
    >
      <div contentEditable className="todoMemoInputBox"></div>
      <div className="todoMemoToolbar">
        <button>저장</button>
      </div>
    </div>
  );
};

export default TodoMemo;
