import { useEffect, useRef } from "react";

const TodoMemo = ({ todos, setTodos }) => {
  const memoRef = useRef(null);
  const currentMemo = todos.find((todo) => todo.ischecked);

  const updateTodoMemo = (e) => {
    const newText = e.currentTarget.innerText;
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === currentMemo?.id ? { ...todo, memo: newText } : todo
      )
    );
  };

  // currentMemo 바뀌었을 때만 ref 초기화 (처음 한 번만 innerText를 설정)
  useEffect(() => {
    if (memoRef.current && currentMemo) {
      // 현재 innerText와 메모가 다를 때만 설정
      if (memoRef.current.innerText !== currentMemo.memo) {
        memoRef.current.innerText = currentMemo.memo || "";
      }
    }
  }, [currentMemo]);

  return (
    <div
      style={{
        display: todos.every((todo) => !todo.ischecked) ? "none" : "block",
      }}
      className="todoMemo"
    >
      {currentMemo && (
        <div
          contentEditable
          className="todoMemoInputBox"
          onInput={updateTodoMemo}
          suppressContentEditableWarning
          ref={memoRef}
        />
      )}
    </div>
  );
};

export default TodoMemo;
