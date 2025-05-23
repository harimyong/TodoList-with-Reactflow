import {
  StarFilledIcon,
  CheckCircledIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";

const TodoListToolbar = ({ todos, setTodos, viewmode, setViewmode }) => {
  const selectedTodosCount = todos.filter(
    (todo) => todo.isshowed === true && todo.ischecked === true
  ).length;

  const doneTodosCount = todos.filter(
    (todo) => todo.iscompleted === true
  ).length;

  const inprogressTodosCount = todos.filter(
    (todo) => todo.iscompleted === false
  ).length;

  const toggleAllCheckboxes = () => {
    if (viewmode === "all") {
      const isallChecked = todos.every((item) => item.ischecked === true);
      setTodos(todos.map((todo) => ({ ...todo, ischecked: !isallChecked })));
    } else if (viewmode === "done") {
      const tempTodos = todos.filter((todo) => todo.iscompleted === true);
      const isallChecked = tempTodos.every((item) => item.ischecked === true);
      setTodos(
        todos.map((todo) =>
          todo.iscompleted === true
            ? { ...todo, ischecked: !isallChecked }
            : todo
        )
      );
    } else if (viewmode === "inprogress") {
      const tempTodos = todos.filter((todo) => todo.iscompleted === false);
      const isallChecked = tempTodos.every((item) => item.ischecked === true);
      setTodos(
        todos.map((todo) =>
          todo.iscompleted === false
            ? { ...todo, ischecked: !isallChecked }
            : todo
        )
      );
    }
  };

  const removeSelectedtodos = () => {
    setTodos(todos.filter((todo) => todo.ischecked !== true));
  };

  const showspecificTodos = (prop) => {
    if (prop === "all") {
      setTodos(todos.map((todo) => ({ ...todo, isshowed: true })));
      setViewmode("all");
    } else {
      const flag = prop === "done" ? true : false;
      setTodos(
        todos.map((todo) =>
          todo.iscompleted === flag
            ? { ...todo, isshowed: true }
            : { ...todo, isshowed: false, ischecked: false }
        )
      );
      if (prop === "done") setViewmode("done");
      else setViewmode("inprogress");
    }
  };

  return (
    <div id="todolistToolbar" className="divBox parent bordBox">
      <div id="leftbar" className="parent divBox">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button onClick={toggleAllCheckboxes} className="MainToolbarButton">
            {todos.length === 0
              ? "todo 없음"
              : todos.every((todo) => todo.ischecked === true)
              ? "전체 해제"
              : "전체 선택"}
          </button>
          <button onClick={removeSelectedtodos} className="MainToolbarButton">
            삭제
          </button>
          <div style={{ marginLeft: "10px" }}>
            {selectedTodosCount + "개 선택됨"}
          </div>
        </div>
      </div>
      <div id="rightbar" className="parent divBox">
        <button
          onClick={() => showspecificTodos("all")}
          className="MainToolbarButton"
        >
          <StarFilledIcon></StarFilledIcon>&nbsp; All &nbsp;
          {'"' + todos.length + '"'}
        </button>
        <button
          onClick={() => showspecificTodos("done")}
          className="MainToolbarButton"
        >
          <CheckCircledIcon></CheckCircledIcon>&nbsp; Done &nbsp;
          {'"' + doneTodosCount + '"'}
        </button>
        <button
          onClick={() => showspecificTodos("inprogress")}
          className="MainToolbarButton"
        >
          <CrossCircledIcon></CrossCircledIcon>&nbsp; In progress &nbsp;
          {'"' + inprogressTodosCount + '"'}
        </button>
      </div>
    </div>
  );
};

export default TodoListToolbar;
