import React, { useContext } from 'react';
import TodoItemsRemaining from './components/TodoItemsRemaining';
import TodoClearCompleted from './components/TodoClearCompleted';
import TodoCompleteAll from './components/TodoCompleteAll';
import TodoFilters from './components/TodoFilters';
import useToggle from './hooks/useToggle';
import { TodosContext } from './context/TodosContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function TodoList() {
  const { todos, setTodos, todosFiltered } = useContext(TodosContext);
  const [featuresOneVisible, setFeaturesOneVisible] = useToggle();
  const [featuresTwoVisible, setFeaturesTwoVisible] = useToggle(false);

  function deleteTodo(id) {
    setTodos([...todos].filter(todo => todo.id !== id));
  }

  function completeTodo(id) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function markAsEditing(id) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = !todo.isEditing;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function updateTodo(event, id) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        if (event.target.value.trim().length === 0) {
          todo.isEditing = false;
          return todo;
        }
        todo.title = event.target.value;
        todo.isEditing = false;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  return (
    <>
      <TransitionGroup component="ul" className="todo-list">
        {todosFiltered().map((todo, index) => (
          <CSSTransition
            key={todo.id}
            timeout={300}
            classNames="slide-horizontal"
            unmountOnExit
          >
            <li className="todo-item-container">
              <div className="todo-item">
                <input
                  type="checkbox"
                  onChange={() => completeTodo(todo.id)}
                  checked={todo.isComplete ? true : false}
                />
                {!todo.isEditing ? (
                  <span
                    onDoubleClick={() => markAsEditing(todo.id)}
                    className={`todo-item-label ${
                      todo.isComplete ? 'line-through' : ''
                    }`}
                  >
                    {todo.title}
                  </span>
                ) : (
                  <input
                    type="text"
                    onBlur={event => updateTodo(event, todo.id)}
                    onKeyDown={event => {
                      if (event.key === 'Enter') {
                        updateTodo(event, todo.id);
                      } else if (event.key === 'Escape') {
                        markAsEditing(todo.id);
                      }
                    }}
                    className="todo-item-input"
                    defaultValue={todo.title}
                    autoFocus
                  />
                )}
              </div>
              <button
                className="x-button"
                onClick={() => deleteTodo(todo.id)}
                checked={todo.isComplete ? true : false}
              >
                <svg
                  className="x-button-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>

      <div className="toggles-container">
        <button onClick={setFeaturesOneVisible} className="button">
          Features one toggle
        </button>
        <button onClick={setFeaturesTwoVisible} className="button">
          Features two toggle
        </button>
      </div>

      <CSSTransition
        in={featuresOneVisible}
        timeout={300}
        classNames="slide-vertical"
        unmountOnExit
      >
        <div className="check-all-container">
          <TodoCompleteAll />

          <TodoItemsRemaining />
        </div>
      </CSSTransition>

      <CSSTransition
        in={featuresTwoVisible}
        timeout={300}
        classNames="slide-vertical"
        unmountOnExit
      >
        <div className="other-buttons-container">
          <TodoFilters />
          <div>
            <TodoClearCompleted />
          </div>
        </div>
      </CSSTransition>
    </>
  );
}

export default TodoList;
