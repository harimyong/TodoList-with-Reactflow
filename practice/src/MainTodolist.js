import {
  PlusCircledIcon,
  CheckCircledIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";

const MainTodoList = ({
  todos,
  setTodos,
  id,
  setId,
  viewmode,
  setViewmode,
}) => {
  const switchCompletedValue = (mode, id) => {
    if (mode !== "edit") {
      setTodos(
        todos.map((todo) =>
          todo.id === id
            ? viewmode === "all"
              ? { ...todo, iscompleted: !todo.iscompleted }
              : {
                  ...todo,
                  iscompleted: !todo.iscompleted,
                  isshowed: false,
                  ischecked: false,
                }
            : todo
        )
      );
    } else {
      setTodos(
        todos.map((todo) =>
          todo.id === id
            ? { ...todo, iscompleted: !todo.iscompleted }
            : {
                ...todo,
                isshowed: true,
              }
        )
      );
    }
  };

  const addTodo = (viewmode) => {
    setId(id + 1);
    if (id > 0) {
      setTodos([
        ...todos,
        {
          id: id,
          name: `new todo`,
          iscompleted: false,
          ischecked: false,
          isshowed: viewmode !== "done" ? true : false,
        },
      ]);
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const renameTodo = (id) => {
    const newName = prompt("새로운 이름을 입력하세요");
    if (newName) {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, name: newName } : todo
        )
      );
    }
  };

  const handleCheckboxChange = (id) => {
    // 특정 체크박스의 상태만 변경
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, ischecked: !todo.ischecked } : todo
      )
    );
  };

  const handleOpen = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, isshowed: true, ischecked: true }
          : { ...todo, isshowed: true, ischecked: false }
      )
    );
    setViewmode("edit");
  };

  return (
    <ul className="todoList">
      {todos.map((todo) =>
        todo.isshowed === true ? (
          <div key={todo.id} className="todoItem">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px" /* 자식들 사이의 간격 */,
                overflow: "hidden",
                boxSizing: "border-box",
              }}
            >
              {viewmode === "edit" ? null : (
                <input
                  type="checkbox"
                  style={{
                    margin: "0 10px",
                    width: "20px",
                    height: "20px",
                  }}
                  checked={todo.ischecked}
                  onChange={() => handleCheckboxChange(todo.id)}
                ></input>
              )}
              <div className="todoItemName">{todo.name}</div>
            </div>

            <div className="todoItemButtons">
              <button
                onClick={() => switchCompletedValue(viewmode, todo.id)}
                style={{
                  backgroundColor: todo.iscompleted ? "#e8fcd4" : "#f2ada5",
                }}
              >
                {todo.iscompleted ? (
                  <CheckCircledIcon color="green" />
                ) : (
                  <CrossCircledIcon color="red" />
                )}
              </button>

              <button onClick={() => handleOpen(todo.id)}>열기</button>
              <button onClick={() => deleteTodo(todo.id)}>삭제</button>
              <button onClick={() => renameTodo(todo.id)}>이름 변경</button>
            </div>
          </div>
        ) : null
      )}
      <button onClick={() => addTodo(viewmode)} className="todoItem Plus">
        <PlusCircledIcon />
      </button>
    </ul>
  );
};

export default MainTodoList;
