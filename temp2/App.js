import React, { useState } from "react";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const handleOpen = (todo) => {
    setSelectedTodo(todo);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedTodo(null);
  };

  return (
    <div className="wrapper">
      <h1>Todo Title</h1>
      <TodolistToolbar />

      <div className={`content ${isOpen ? "open" : ""}`}>
        <div className={`center-panel ${isOpen ? "closed" : ""}`}>
          <Todolist onOpen={handleOpen} />
        </div>

        <div className={`right-panel ${isOpen ? "open" : ""}`}>
          {selectedTodo && (
            <div>
              <h2>{selectedTodo.title}</h2>
              <p>{selectedTodo.details}</p>
              <button onClick={handleClose}>닫기</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Todolist = ({ onOpen }) => {
  const todos = [
    { id: 1, title: "할 일 1", details: "상세 내용 1" },
    { id: 2, title: "할 일 2", details: "상세 내용 2" },
  ];

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.title}
          <button onClick={() => onOpen(todo)}>열기</button>
        </li>
      ))}
    </ul>
  );
};

const TodolistToolbar = () => <div>툴바 내용</div>;

export default App;
