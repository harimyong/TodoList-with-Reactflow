import {
  PlusCircledIcon,
  CheckCircledIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";
//import { useReactFlow } from "@xyflow/react";
import { useState, useEffect } from "react";
const MainTodoList = ({
  todos,
  setTodos,
  viewmode,
  setViewmode,
  showedTodoid,
  setShowedTodoid,
}) => {
  const [todoid, setTodoid] = useState(0);

  const switchCompletedValue = (id) => {
    if (viewmode !== "edit") {
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

  const addTodo = () => {
    setTodoid(todoid + 1);
  };

  useEffect(() => {
    if (todoid > 0) {
      setTodos([
        ...todos,
        {
          id: todoid,
          name: `td${todoid}`,
          iscompleted: false,
          ischecked: false,
          isshowed: viewmode !== "done" ? true : false,
          memo: "",
          nodes: [],
          edges: [],
        },
      ]);
    }
    // eslint-disable-next-line
  }, [todoid]);

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    if (viewmode === "edit") {
      const todoToDelete = todos.find((todo) => todo.ischecked === true);
      if (todoToDelete === null || todoToDelete === undefined) {
        setViewmode("all");
      }
    }
  }, [todos, viewmode, setViewmode]);

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
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, ischecked: !todo.ischecked } : todo
      )
    );
  };

  const handleOpen = (id) => {
    todos.forEach((todo) => {
      if (todo.id === id && showedTodoid !== id) {
        setTodos(
          todos.map((todo) =>
            todo.id === id
              ? {
                  ...todo,
                  isshowed: true,
                  ischecked: true,
                  nodes: todo.nodes.map((nd) => ({ ...nd, selected: false })),
                }
              : { ...todo, isshowed: true, ischecked: false }
          )
        );
        setShowedTodoid(id);
      }
    });
    setViewmode("edit");
  };

  return (
    <ul id="todoList" className="divBox bordBox">
      {todos.map((todo) =>
        todo.isshowed === true ? (
          <div key={todo.id} id="todoItem" className="parent divBox bordBox">
            <div id="todoItemleft" className="parent">
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
              <div id="todoItemName">{todo.name}</div>
            </div>

            <div id="todoItemRight" className="parent rowSorted">
              <button
                className="rowSorted"
                style={{
                  backgroundColor: todo.iscompleted ? "#e8fcd4" : "#f2ada5",
                }}
                onClick={() => switchCompletedValue(todo.id)}
              >
                {" "}
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
      <button id="todoItem" className="plus divBox bordBox" onClick={addTodo}>
        <PlusCircledIcon />
      </button>
    </ul>
  );
};

export default MainTodoList;
