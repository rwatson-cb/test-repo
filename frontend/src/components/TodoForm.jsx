import React, { useState, useContext } from 'react';
import { TodosContext } from '../context/TodosContext';


function TodoForm() {
  const { todos, setTodos, idForTodo, setIdForTodo } = useContext(TodosContext);
  const [todoInput, setTodoInput] = useState('');

  function handleInput(event) {
    setTodoInput(event.target.value);
  }

  function addTodo(event) {
    event.preventDefault();

    if (todoInput.trim().length === 0) {
      return;
    }

    setTodos([
      ...todos,
      {
        id: idForTodo,
        title: todoInput,
        isComplete: false,
      },
    ]);

    setIdForTodo(previousIdForTodo => previousIdForTodo + 1);

    setTodoInput('');
  }

  return (
    <form action="#" onSubmit={addTodo}>
      {' '}
      {/*  () => alert('form submitted') */}
      <input
        type="text"
        value={todoInput}
        onChange={handleInput}
        className="todo-input"
        placeholder="What do you need to do?"
        onKeyDown={event => {
          if (event.key === 'Escape') {
            event.target.blur();
          }
        }}
      />
    </form>
  );
}

export default TodoForm;
